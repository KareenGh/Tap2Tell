import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MailerInterface, UserConfig, UserService, SALT, User, AccessLoggerService } from '@hilma/auth-nest';
import { Child } from './child.entity';
import * as bcrypt from 'bcrypt';
import * as jwksClient from "jwks-rsa";

function debug(...args: any[]) {
  console.log('**** : ', new Date(), ...args)
}
function error(...args: any[]) {
  console.log('ERROR:\n', new Date(), ...args);
}
@Injectable()

export class ChildService extends UserService {
  constructor(
    @Inject('USER_MODULE_OPTIONS') protected config_options: UserConfig,
    @InjectRepository(Child)
    protected readonly userRepository: Repository<Child>,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
    @Inject('accessLoggerService')
    protected readonly accessLoggerService: AccessLoggerService,
    @Inject('MailService')
    protected readonly mailer: MailerInterface

  ) {
    super(config_options, userRepository, jwtService, configService, mailer, accessLoggerService);
  }

  async userDetails(userId: string) {
    const details = await this.userRepository.createQueryBuilder().select('fullName AS name').addSelect('username AS email').addSelect('password').where(`id = ${JSON.stringify(userId)}`)
      .getRawMany()
    if (details.length > 0) return details[0];
    return false
  }

  async findUserEmail(email: string) {
    const userEmail = await this.userRepository.createQueryBuilder().select('fullName').addSelect('id').addSelect('emailVerified').addSelect('password').where(`username = ${JSON.stringify(email)}`)
      .getRawMany()
    return userEmail[0] ? userEmail[0] : false;
  }

  async getName(userId: string) {
    const username = await this.userRepository.createQueryBuilder().select('fullName').where(`id = ${JSON.stringify(userId)}`)
      .getRawMany()
    return username[0];
  }

  async EmailVerified(email: string): Promise<number | string> {
    const username = await this.userRepository.createQueryBuilder().select('emailVerified').where(`username = ${JSON.stringify(email)}`)
      .getRawMany()
    if (username.length > 0) {
      if (username[0].emailVerified === 1) {
        return 'emailVerified';
      } else if (username[0].emailVerified === 0) {
        return 'emailNotVerified';
      }
    } else {
      return 'notExists'
    }
  };

  //Change child password
  async changeChildPassword(username: string, password: string) {
    try {
      const hash = bcrypt.hashSync(password, SALT);
      return await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ password: hash })
        .where({ username: username })
        .execute();
    } catch (err) {
      throw error('change child pass err')
    };
  };

  async getHash(username: string) {
    const hash = await this.userRepository.createQueryBuilder().select('password').where(`username = ${JSON.stringify(username)}`)
      .getRawMany()
    return hash && hash[0] && hash[0].password ? hash[0].password : false;
  }


  /**
   * checks whether the sign in request is valid and whether the user is legitimate
   * will return the apple user's email (from the identityToken)
   * @param identityToken from appleId sign in ('identityToken' field which comes from req.body from client-side)
   * @param reqUser from appleId sign in ('user' field which comes from req.body from client-side)
   * @returns 
   */
  async verifyAppleUser(identityToken: string, reqUser: string): Promise<string | null> {
    debug('verifyAppleUser HERE.')

    // identityToken is a jwt from Apple. decode it:
    const json = this.jwtService.decode(identityToken, { complete: true });
    debug('decoded json: ', json)

    // get kid (=~ keyId) from json.header.kid (key id, we want to check that this key id is really from Apple)
    const { kid: keyId } = typeof json === "object" ? (json.header) : ({ kid: null });
    debug('kid is: ', keyId)
    // get Apple's key id
    const appleKey = await this.getAppleSigninKey(keyId);
    if (!appleKey) {
      error("somthing went wrong, cant get appleKey: ", appleKey);
      throw { err: true };
    }
    // now that we have apple's signIn key we need to-
    // validate that the identityToken was actually created by apple (using jwtService.verifyAsync):
    const payload = await this.jwtService.verifyAsync(identityToken, { publicKey: appleKey });
    debug('payload:', payload);
    const isValidPayload = payload && payload.sub === reqUser && payload.aud === "com.hilma.tap2tellapp"
    debug('isValidPayload : ', isValidPayload)
    if (isValidPayload) {
      return payload?.email;
    };
  }


  async getAppleSigninKey(kid: string) {
    debug('getAppleSigninKey HERE.')
    const client = jwksClient({ jwksUri: "https://appleid.apple.com/auth/keys", });
    try {
      const key = await client.getSigningKey(kid)
      debug('key:', key);
      const signinKey = key.getPublicKey();
      debug('signinKey:', signinKey);
      return signinKey;
    }
    catch (e) {
      error('getAppleSigninKey error: ' + e)
      return null
    }
  }


}
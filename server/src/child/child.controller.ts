import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { UserService, UseLocalAuth, RequestUser, Role, SALT, UseJwtAuth } from '@hilma/auth-nest';
import { Response } from 'express';
import { error } from 'console';

import { Child } from './child.entity';
import { ChildService } from './child.service';
import { env } from "process";
import { AppleLoginDTO } from './apple-login.dto';

import { compareSync } from 'bcrypt'
// const saltRounds = 10;

const nameRegex = new RegExp(/^[a-zA-Z\u0590-\u05EA\s'",.-]{2,40}$/);
const passwordRegex = new RegExp(/^[a-zA-Z\u0590-\u05EA0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16}$/);
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/);
@Controller('/api/child')
export class ChildController {

    constructor(private readonly userService: UserService,
        private readonly childService: ChildService,
    ) { }

    @Get('/email-verified-check')
    async emailVerified(@Query('email') email: string) {
        console.log("GET email-verified-check/");

        if (!email) {
            return 'notExists'
        }
        const EmailNotVerified = await this.childService.EmailVerified(email);
        return EmailNotVerified

    }

    @Post('/login')
    @UseLocalAuth()
    async login(@RequestUser() userInfo, @Res() res) {
        try {
            const body = await this.userService.login(userInfo, res);
            const details = await this.childService.getName(body.id)
            const userName = details.fullName
            res.send({ ...body, userName })
        } catch (err) {
            res.send('err')
            throw error('login err: ', err);
        }
    }

    @Post('/register')
    async register(@Body() data, @Res() res: Response) {
        if (emailRegex.test(data.email) && nameRegex.test(data.name)) {
            if (!data.emailVerified) {
                if (!passwordRegex.test(data.password)) {
                    res.send('err');
                    throw error;
                }
            }
            let username = data.email;
            let password = data.password;
            let fullName = data.name;
            let emailVerified = data.emailVerified;
            let user: Partial<Child> = new Child({ username, password, fullName, emailVerified });
            let userRole = new Role();
            userRole.id = 1; //just the role id. 
            user.roles = [userRole];
            if (emailVerified) {
                //Get in when the user register with google. We need it to add a user without his accept from google.
                let role = new Role();
                role.id = 1; role.name = 'CHILD'; role.roleKey = "dkdjfk22SS";
                let userRes = await this.userService.forceLogin({ username: username, fullName: fullName }, "username", res, [role]);
                res.send(userRes)
                // return userRes
            } else {
                let newuser = await this.userService.createUser<Child>(user);
                res.send(newuser)
                // return;
            }
        }
    }

    @Get('/email-verify')
    verify(@Query('token') token, @Res() res) {
        this.childService.verifyEmailByToken(token);
        res.redirect(`${env.HOST}/?data=email-verify`);
    }

    @Post('/google-login')
    async findUser(@Body('email') email: string, @Res() res: Response) {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/);
        if (!emailRegex.test(email)) {
            // res.send('err');
            console.log("Validation err for email:", email);
            throw error('validation err')
        }
        const findUser = await this.childService.findUserEmail(email)
        if (!findUser) {
            res.send(false);
            return findUser;
        }
        if (!findUser.password) { // (shani: i think it's because google users have no pw)
            let role = new Role();
            role.id = 1; role.name = 'CHILD'; role.roleKey = "dkdjfk22SS";
            let userRes = await this.userService.forceLogin({ username: email }, "username", res, [role]);
            res.send(userRes);
            return userRes;
        }
        res.send('NotGoogleSignIn');
        return findUser;


    }


    @Post('apple-login')
    async appleLogin(@Res() res: Response, @Body() body: AppleLoginDTO) {
        console.log('\n\n\ncontroller| POST apple-login HERE.')

        const { identityToken, user: reqUser, childName } = body;
        console.log('\n');
        console.log('controller| >> identityToken:', identityToken);
        console.log('controller| >> reqUser:', reqUser);
        console.log('controller| >> childName:', childName);

        if (!nameRegex.test(childName)) {
            console.error('invalid name, name is tested in frontend too, how did it get here? :', childName)
            throw { error: true }
        }
        try {
            const email = await this.childService.verifyAppleUser(identityToken, reqUser)
            if (!email) {
                throw new HttpException({ err: true, message: "no email: " + email }, HttpStatus.BAD_REQUEST);
            }
            console.log('controller| >> GOT EMAIL: ', email);
            // create or login user: (no need to verify email cos apple-login)
            const role = new Role();
            role.id = 1; role.name = 'CHILD'; role.roleKey = "dkdjfk22SS";
            const loginRes = await this.userService.forceLogin({ username: email, fullName: childName, emailVerified: 1 }, "username", res, [role]);
            console.log('controller| loginRes:', loginRes);
            return res.send(loginRes);
        } catch (e) {
            console.error('>> apple-login  error: ' + e)
            throw new HttpException({ error: true }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('reset-password')
    async ResetPassword(@Body() { email }) {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/);
        if (emailRegex.test(email)) {
            const findUser = await this.childService.findUserEmail(email)
            if (findUser) {
                let reset = await this.userService.sendChangePasswordEmail(email);
                return { validateEmail: true, verifiedEmail: true };
            } else {
                return { validateEmail: true, verifiedEmail: false };
            }
        } else {
            return { validateEmail: false, verifiedEmail: null };
        }

    }

    @Get('change-password')
    changePassword(@Query('token') token, @Res() res) {
        res.redirect(`${env.HOST}/?token=${token}?data=FromUrl`);
    }

    @Post('replace-password')
    async replacePassword(@Body('token') token, @Body('email') email: string, @Body('newPassword') newPassword: string) {
        try {
            let reset = await this.userService.changePasswordWithToken(token, email, newPassword)
        } catch (err) {
            throw error('replace pass err:', err)
        };
    };

    @Post('change-child-password')
    async changePass(@Body('username') username: string, @Body('newPassword') newPassword: string, @Body('currentPass') currentPass: string, @Res() res: Response) {
        if (emailRegex.test(username) && passwordRegex.test(newPassword)) {
            //Check the password from DB 
            const hashCurrent = await this.childService.getHash(username);
            if (hashCurrent) {
                let response = compareSync(currentPass, hashCurrent);
                if (response) {
                    await this.childService.changeChildPassword(username, newPassword);
                    let role = new Role();
                    role.id = 1; role.name = 'CHILD'; role.roleKey = "dkdjfk22SS";
                    let userRes = await this.userService.forceLogin({ username: username }, "username", res, [role]);
                    res.send(userRes);
                } else {
                    res.send('PassNotCorrect');
                    return 'PassNotCorrect';
                };
            } else {
                res.send('googleLogin');
                return 'googleLogin'
            }
        } else {
            res.send('validation err');
            throw error('validation err');
        };
    };

    @Get('find-user')
    async findChildUser(@Query('username') username: string) {
        const findUser = await this.childService.findUserEmail(username)
        if (findUser) {
            if (findUser.emailVerified === 0) {
                return 'EmailNotVerified';
            };
            if (!findUser.password) {
                return 'UserHasNoPassword';
            };
            return 'Exist'
        }
        return 'NotExist';
    }

    @Get('get-current-child')
    @UseJwtAuth("CHILD")
    async getCurrentChild(@RequestUser('id') userId) {
        console.log("GET /get-current-child")
        console.log('userId:', userId);
        const currentChild = await this.childService.userDetails(userId);
        console.log('currentChild:', currentChild);
        if (currentChild) {
            return { ...currentChild, googleLogin: !currentChild.password, id: userId, password: undefined };
        } else {
            return false;
        };
    }
};
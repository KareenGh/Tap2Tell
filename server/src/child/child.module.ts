import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import {
  RoleModule,
  UserModule,
  USER_MODULE_OPTIONS,
  NodeMailerService,
  User,
  AccessLoggerModule, AccessLoggerService
} from '@hilma/auth-nest';

import { ChildController } from './child.controller';
import { ChildService } from './child.service';
import { Child } from './child.entity';

@Module({
  imports: [
    RoleModule,
    UserModule,
    TypeOrmModule.forFeature([Child, User]), // todo why both?
    JwtModule.register({}),
    UserModule.register({ set_access_logger: true }),
    AccessLoggerModule
  ],
  controllers: [ChildController],
  providers: [
    ChildService,
    // {
    //   provide: 'UserService',
    //   useExisting: ChildService
    // },
    {
      provide: "MailService",
      useClass: NodeMailerService
    },
    {
      provide: "accessLoggerService",
      useExisting: AccessLoggerService,
    },
    {
      provide: "UserService",
      useExisting: ChildService  //your service again.
    },
    {
      provide: USER_MODULE_OPTIONS,
      useValue: { emailVerification: true },
    },
  ],
  exports: [ChildService]
})
export class ChildModule { }
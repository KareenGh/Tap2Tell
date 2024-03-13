import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ChildModule } from './child/child.module';
import { LetterImageModule } from './letter-image/letter-image.module';
import { RelativeModule } from './relative/relative.module';

import { FilesHandlerModule } from '@hilma/fileshandler-typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ImagesArchiveModule } from './images-archive/images-archive.module';
import { join } from 'path'
import { RoleModule } from '@hilma/auth-nest';
import { FactModule } from './fact/fact.module';


let imports = [
  FilesHandlerModule.register({
    folder: "../../files",
    autoAllow: true,
    imageSizes: { image: 2500 },
  }),
  TypeOrmModule.forRoot(),
  ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
    envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`]
  }),
  ChildModule,
  LetterImageModule,
  RelativeModule,
  ImagesArchiveModule,
  RoleModule,
  FactModule

];
process.env.NODE_ENV === "production" && imports.push(ServeStaticModule.forRoot(
  {
    rootPath: join(__dirname, '../../client-relative/', 'build')
  }
));


@Module({
  imports: imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
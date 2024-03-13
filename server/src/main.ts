import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //*
  app.use(cookieParser())
  const PORT = process.env.PORT || 8080
  await app.listen(PORT);
  console.log('running on PORT:', PORT);
}
bootstrap();

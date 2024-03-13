import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterImageController } from './letter-image.controller';
import { LetterImageService } from './letter-image.service';
import { LetterImage } from './letter-image.entity';
import { ImagesArchiveModule } from 'src/images-archive/images-archive.module';
import { SocketGatway } from 'src/socket/events.gateway';
import { RelativeModule } from 'src/relative/relative.module';
import { RelativeService } from 'src/relative/relative.service';
import { ChildModule } from 'src/child/child.module';
import { UserModule } from '@hilma/auth-nest';
import { FactController } from 'src/fact/fact.controller';
import { FactModule } from 'src/fact/fact.module';

@Module({
  imports: [FactModule, UserModule, ChildModule, ImagesArchiveModule, TypeOrmModule.forFeature([LetterImage]), forwardRef(() => RelativeModule)],
  controllers: [LetterImageController],
  providers: [LetterImageService, SocketGatway, RelativeService],
  exports: [TypeOrmModule, LetterImageService]
})
export class LetterImageModule { }
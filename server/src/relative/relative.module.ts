import { UserModule } from '@hilma/auth-nest';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterImageController } from 'src/letter-image/letter-image.controller';
import { LetterImageModule } from 'src/letter-image/letter-image.module';
import { LetterImageService } from 'src/letter-image/letter-image.service';
import { RelativeController } from './relative.controller';
import { Relative } from './relative.entity';
import { RelativeService } from './relative.service';

@Module({
  imports: [UserModule, forwardRef(() => LetterImageModule), TypeOrmModule.forFeature([Relative])],
  providers: [RelativeService, LetterImageService],
  controllers: [RelativeController],
  exports: [TypeOrmModule]
})
export class RelativeModule { }
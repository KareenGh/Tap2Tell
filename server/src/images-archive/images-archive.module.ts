import { Module } from '@nestjs/common';
import { ImagesArchiveService } from './images-archive.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageArchive } from './images-archive.entity';
import { ImagesArchiveController } from './images-archive.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ImageArchive])],
  controllers: [ImagesArchiveController],
  providers: [ImagesArchiveService],
  exports: [ImagesArchiveService, TypeOrmModule]
})
export class ImagesArchiveModule {}

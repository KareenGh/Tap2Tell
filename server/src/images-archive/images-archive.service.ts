import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeLetterServer, Status } from 'src/letter-image/letter-image.interface';
import { Repository } from 'typeorm';
import { ImageArchive } from './images-archive.entity';
import { imageDetails } from './images-archive.interface';

@Injectable()
export class ImagesArchiveService {
    constructor(
        @InjectRepository(ImageArchive)
        private ImagesArchiveRepository: Repository<ImageArchive>,
    ) { }

    async addImage(imageDetails: imageDetails) {
        if (imageDetails) {
            const addNewImage = await this.ImagesArchiveRepository.createQueryBuilder()
                .insert()
                .into(ImageArchive)
                .values({
                    imageCreated: imageDetails.created,
                    imageId: imageDetails.id,
                    imagePath: imageDetails.imagePath,
                    imageStatus: imageDetails.imageStatus,
                    letter: ChangeLetterServer[imageDetails.letter],
                    relativeId: imageDetails.relativeId,
                    responseAudioPath: imageDetails.responseAudioPath,
                    imageUpdated: imageDetails.updated,
                    userId: imageDetails.userId,
                })
                .execute();
        } else return;
    }

}

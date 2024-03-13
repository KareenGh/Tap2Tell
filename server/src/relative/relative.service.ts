import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relative } from './relative.entity';
import { ImageService, FilesType } from '@hilma/fileshandler-typeorm';


@Injectable()
export class RelativeService {
    constructor(
        @InjectRepository(Relative)
        protected readonly RelativeRepository: Repository<Relative>,
        private readonly imageService: ImageService
    ) { }

    //add new relative to relative table
    async newRelative(files: FilesType, relativeName: string, relativeImageId: number, relativeUuid: string): Promise<string> {
        const imagePath = await this.imageService.save(files, relativeImageId);
        //create new row for image
        const newRelative = new Relative();
        newRelative.relativeName = relativeName;
        newRelative.relativeImagePath = imagePath;
        newRelative.deviceId = relativeUuid;
        newRelative.type = 'Relative'
        await this.RelativeRepository.save(newRelative);
        return newRelative.id;
    }

    //get relative details for child
    async relativeDetails(relativeId: string) {
        let relativeDetails = await this.RelativeRepository.createQueryBuilder().select('relative_name AS relativeName').addSelect('relative_image_path AS relativeImagePath').where(`id = ${JSON.stringify(relativeId)}`).getRawMany()
        return relativeDetails;
    }

    async getRelativeDetailsByDeviceUuid(deviceId: string) {
        let relativeUuid = await this.RelativeRepository.createQueryBuilder().select('relative_name AS relativeName').addSelect('id').addSelect('relative_image_path AS relativeImagePath').where(`device_id = ${JSON.stringify(deviceId)}`).getRawMany()
        return relativeUuid
    }
}


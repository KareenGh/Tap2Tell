import { Body, Controller, Post, Param, Get, Query } from '@nestjs/common';
import { RelativeService } from './relative.service';
import { FilesType, UseFilesHandler, UploadedFiles } from "@hilma/fileshandler-typeorm";
import { LetterImageService } from 'src/letter-image/letter-image.service';
import { newRelativeDetails } from './relative.interface';
import { UseJwtAuth } from '@hilma/auth-nest';
import { error } from 'console';
import { Child } from 'src/child/child.entity';
import { NO_SPECIAL_CHARS_REGEX } from 'src/conts/regexes';


@Controller('/api/relative')
export class RelativeController {
    constructor(private readonly relativeService: RelativeService, private readonly letterImageService: LetterImageService) { }

    // add new relative to the relative table
    @Post("/add-new-relative")
    @UseFilesHandler()
    async newImage(@UploadedFiles() files: FilesType, @Body() newRelativeDetails: newRelativeDetails) {

        //Relative name validation 
        const nameValid = NO_SPECIAL_CHARS_REGEX.test(newRelativeDetails.relativeName);

        //Image id and device uuid validation
        const idReg = new RegExp(/^([a-z0-9]{8}\b)+\-([a-z0-9]{4}\b)+\-([a-z0-9]{4}\b)+\-([a-z0-9]{4}\b)+\-[a-z0-9]{12}$/)
        const idValid = idReg.test(newRelativeDetails.imageId);
        const uuidValid = idReg.test(newRelativeDetails.relativeUuid)

        if (nameValid && idValid && uuidValid) {
            let responed = await this.letterImageService.ifResponed(newRelativeDetails.imageId)
            if (responed === 'imageId not exists' || responed) {
                return false;
            }
            return await this.relativeService.newRelative(files, newRelativeDetails.relativeName, newRelativeDetails.relativeImageId, newRelativeDetails.relativeUuid)
        }
        else {
            throw error('new relative err')
        }
    }

    @UseJwtAuth('CHILD')
    @Get('relative-details')
    async relativeDetails(@Query('relativeId') relativeId: string) {
        const idReg = new RegExp(/^([a-z0-9]{8}\b)+\-([a-z0-9]{4}\b)+\-([a-z0-9]{4}\b)+\-([a-z0-9]{4}\b)+\-[a-z0-9]{12}$/)
        const idValid = idReg.test(relativeId);
        if (relativeId !== '' && idValid) {
            return await this.relativeService.relativeDetails(relativeId)
        } else throw error('relative details err')
    }
}

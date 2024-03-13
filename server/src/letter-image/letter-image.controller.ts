import { Body, Controller, Put, Get, Post, Query, Res, Redirect } from '@nestjs/common';
import { LetterImageService } from './letter-image.service';
import { UseFilesHandler, UploadedFiles, FilesType } from '@hilma/fileshandler-typeorm';
import { ChangeLetterClient, ChangeLetterServer, imageId, newImageDetails, newStatusDetails, Status } from './letter-image.interface'
import { ImagesArchiveService } from 'src/images-archive/images-archive.service';
import { SocketGatway } from 'src/socket/events.gateway';
import { RelativeService } from 'src/relative/relative.service';
import { ChildService } from '../child/child.service';
import { error } from 'console';
import { UseJwtAuth, RequestUser } from '@hilma/auth-nest';
import { Child } from 'src/child/child.entity';
import { FactService } from '../fact/fact.service';

@Controller('/api/letter-image')
export class LetterImageController {
    constructor(private readonly letterImageService: LetterImageService, private readonly imagesArchiveService: ImagesArchiveService, private readonly SocketGatway: SocketGatway, private readonly relativeService: RelativeService, private readonly childService: ChildService, private readonly factService: FactService) { }
    idReg = new RegExp(/^([a-z0-9]{8}\b)+\-([a-z0-9]{4}\b)+\-([a-z0-9]{4}\b)+\-([a-z0-9]{4}\b)+\-[a-z0-9]{12}$/)

    //get image path id for send image to another relative element
    @UseJwtAuth('CHILD')
    @Get("letters-page")
    async lettersPage(@Query('userId') userId: string) {
        console.log('GET /letters-page');
        const idValid = this.idReg.test(userId);
        if (idValid) {
            const letterArr = await this.letterImageService.getScore(userId);
            const envelope = await this.letterImageService.checkResponse(userId);
            const responseDetails = { envelope: envelope, letterArr: letterArr }
            return responseDetails;
        } else {
            throw error('validation err')
        }
    }

    //get arr of image url, id and status
    @UseJwtAuth('CHILD')
    @Get("image-details")
    getDocs(@RequestUser() user, @Query('letter') letter: string, @Query('userId') userId: string) {
        const letterReg = new RegExp(/^[\u0590-\u05EA]$/)
        const idValid = this.idReg.test(userId);
        const letterValid = letterReg.test(letter);
        if (letterValid && idValid) {
            return this.letterImageService.imageStatusArr(letter, userId);
        } else {
            console.log('validation err');
            throw error('validation err');

        }
    }

    //Add new image and upload new file of this image 
    @UseJwtAuth('CHILD')
    @Post("post-image-url")
    @UseFilesHandler()
    async newImage(@UploadedFiles() files: FilesType, @Body() newImageDetails: newImageDetails) {
        const idValid = this.idReg.test(newImageDetails.userId);
        let imageId;
        if (idValid) {
            imageId = await this.letterImageService.newImage(files, newImageDetails.letter, newImageDetails.imageId, newImageDetails.userId)
            if (this.idReg.test(imageId.id)) {
                const facts = [{
                    factType: 'user',
                    factValue: newImageDetails.userId,
                    grainId: imageId.id
                }, {
                    factType: 'letter',
                    factValue: ChangeLetterServer[newImageDetails.letter],
                    grainId: imageId.id
                }]
                this.factService.createFacts(facts)
            } else {
                throw error('image id validation err')
            }
        } else {
            console.log('validation err');
            throw error('validation err');
        };
        return imageId;
    }


    //Change image status following the relative answer
    @Post('/change-status-letter')
    @UseFilesHandler()
    async updateStatusAndAudio(@UploadedFiles() files: FilesType, @Body() newStatusDetails: newStatusDetails) {
        if (this.idReg.test(newStatusDetails.imageId) && this.idReg.test(newStatusDetails.userId) && this.idReg.test(newStatusDetails.relativeId) && (newStatusDetails.imageStatus === Status.DISAPPROVED || newStatusDetails.imageStatus === Status.APPROVED)) {
            try {
                let responed = await this.letterImageService.ifResponed(newStatusDetails.imageId)
                if (responed === 'imageId not exists' || responed) {
                    return false
                }
                let audioPath = await this.letterImageService.updateStatus(files, newStatusDetails.imageStatus, newStatusDetails.imageId, newStatusDetails.responseAudioId, newStatusDetails.relativeId);
                const facts = [{
                    factType: 'response',
                    factValue: newStatusDetails.imageStatus,
                    grainId: newStatusDetails.imageId
                }, {
                    factType: 'response_relative',
                    factValue: newStatusDetails.relativeId,
                    grainId: newStatusDetails.imageId
                }]
                this.factService.createFacts(facts)
                this.SocketGatway.newMessage(newStatusDetails, audioPath);
                return audioPath;
            } catch (err) {
                console.log('change-status-letter err', err);
            }
        } else {
            throw error('validation err');
        }

    }

    @Get("check-status-score")
    async responseCheck(@Query('id') id: string, @Query('uuid') uuid: string) {
        const uuidValid = this.idReg.test(uuid);
        const idValid = this.idReg.test(id);
        let deviceUuis;
        if (idValid) {

            if (uuidValid) {
                //Check if relative exists
                deviceUuis = await this.relativeService.getRelativeDetailsByDeviceUuid(uuid);
            } else {
                deviceUuis = false;
            }

            //Check the status and score of the image the child sent to be sure if show it or not
            const responsed = await this.letterImageService.responseCheck(id);
            const imageDetails = await this.letterImageService.getImagePath(id)// pass id of letter image 
            if (!imageDetails) {
                return false
            }
            if (this.idReg.test(imageDetails.userId)) {
                var userName = await this.childService.getName(imageDetails.userId)
            } else {
                console.log('imageDetails.userId validation err');
                throw error('validation err');
            }
            return { ...deviceUuis, ...responsed, ...imageDetails, ...userName }
        } else {
            throw error('validation err at check-status-score')
        }
    }

    //change isNewResponse to 0 from 1 after envelope's press 
    @UseJwtAuth('CHILD')
    @Post('update-response')
    updateNewResponse(@Body() imageId: imageId) {
        const isValid = this.idReg.test(imageId.data);
        if (isValid) {
            return this.letterImageService.UpdateNewResponse(imageId.data);
        } else {
            throw error('update-response');
        }

    }

    @UseJwtAuth('CHILD')
    @Post('updated')
    updated(@Body() imageId: imageId) {
        const isValid = this.idReg.test(imageId.data);
        if (isValid) {
            return this.letterImageService.updated(imageId.data);
        } else {
            throw error('updated');
        }

    }

    @UseJwtAuth('CHILD')
    @Post('remove-image')
    async removeRow(@Body() imageId: imageId) {
        const isValid = this.idReg.test(imageId.data);
        if (isValid) {
            var removeImageDetails = await this.letterImageService.removeImage(imageId.data);
            if (removeImageDetails && removeImageDetails[0]) {
                let addNewArchive = await this.imagesArchiveService.addImage(removeImageDetails[0]);
                removeImageDetails[0].letter = ChangeLetterClient[removeImageDetails[0].letter]
                return removeImageDetails;
            }
            return;
        } else {
            throw error('remove image err');
        }
    }

    @Get('find-uuid')
    async findUuid(@Query('uuid') uuid: string) {
        const uuidValid = this.idReg.test(uuid);
        if (uuidValid) {
            const deviceUuid = await this.relativeService.getRelativeDetailsByDeviceUuid(uuid);
            if (deviceUuid && Object.keys(deviceUuid).length) {
                return true;
            }
            return false;
        } else {
            throw error('validation err');
        }
    };

    @UseJwtAuth('CHILD')
    @Post('stop-reminding')
    async stopReminding(@Body() imageId: imageId) {
        try {
            var removeImageDetails = await this.letterImageService.stopReminding(imageId.data);
            return;
        } catch (err) {
            throw error(err);
        }
    }
}
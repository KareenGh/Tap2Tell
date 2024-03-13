import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { LetterImage } from './letter-image.entity';
import { ChangeLetterClient, ChangeLetterServer, Status } from './letter-image.interface'
import { ImageService, FilesType, AudioService } from '@hilma/fileshandler-typeorm';

// var ffmpeg = require('ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { exec } = require("child_process");
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);




@Injectable()
export class LetterImageService {
    constructor(
        @InjectRepository(LetterImage)
        private LetterImageRepository: Repository<LetterImage>,
        private readonly imageService: ImageService,
        private readonly audioService: AudioService
    ) { }

    // add new image
    newImage = async (files: FilesType, letter: string, imageId: number, userId: string): Promise<object> => {
        let choosenLetter = ChangeLetterServer[letter];
        let id = imageId
        try {

            var imagePath = await this.imageService.saveInSize(files, id, 300);
        }
        catch (err) {
            console.error('catch err', err)
            throw new Error("save image err")
        }
        const str = imagePath;
        const patt = new RegExp(/^[/image/]+[A-Za-z0-9]+.jpg$/);
        const isValid = patt.test(str);
        if (isValid) {
            //create new row for image
            const addNewImage = await this.LetterImageRepository.createQueryBuilder()
                .insert()
                .into(LetterImage)
                .values({
                    userId: userId,
                    imageStatus: Status.PENDING,
                    isNewResponse: false,
                    letter: choosenLetter,
                    imagePath: imagePath,
                })
                .execute();
            let pushToImageArr = {
                id: addNewImage.generatedMaps[0].id,
                imagePath: addNewImage.generatedMaps[0].imagePath,
                imageStatus: addNewImage.generatedMaps[0].imageStatus,
                updated: Date()
            }
            return pushToImageArr;
        }
    }

    //get arr of object that show the letter and it score. letter without score will not appear
    async getScore(userId: string) {
        let countScore = await this.LetterImageRepository.createQueryBuilder().select('letter').addSelect('COUNT(letter) AS score').where(`image_status = "${Status.APPROVED}" `).andWhere('is_new_response = 0').andWhere('relative_id is not null').andWhere(`user_id = ${JSON.stringify(userId)}`)
            .orderBy("letter", "ASC")
            .groupBy("letter").getRawMany()
        for (let i = 0; i < countScore.length; i++) {
            countScore[i].letter = ChangeLetterClient[countScore[i].letter]
        }
        return countScore;
    }

    // give an arr of object with imageStatus, url of image, if there is new response and id. imagePath = null will not appear 
    async imageStatusArr(letter: string, userId: string) {
        let statusUrl = await this.LetterImageRepository.createQueryBuilder()
            .select('image_status AS imageStatus')
            .addSelect('image_path AS imagePath')
            .addSelect('id')
            .addSelect('is_new_response AS isNewResponse')
            .where(`letter= "${ChangeLetterServer[letter]}"`)
            .andWhere('image_path is not null')
            .andWhere(`user_id =${JSON.stringify(userId)}`)
            .orderBy('created')
            .getRawMany()
        return statusUrl;
    }

    //update image status following the relative answer
    updateStatus = async (files: FilesType, imageStatus: Status, imageId: string, responseAudioId: number, relativeId: string) => {
        const audioPath = await this.audioService.save(files, responseAudioId);
        const str = audioPath;
        const str2 = str.substring(0, str.length - 4);
        const newAudioPath = str2.concat('mp3');
        exec(`ffmpeg -i ../files${audioPath} -id3v2_version 3 ../files${newAudioPath} && rm ../files${audioPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                throw new Error(`error: ${error.message}`);
            }
            if (stderr) {
                // console.log(`stderr: ${stderr}`);
                // return;
            }
        });
        await this.LetterImageRepository
            .createQueryBuilder()
            .update(LetterImage)
            .set({
                imageStatus: imageStatus,
                isNewResponse: true,
                responseAudioPath: newAudioPath,
                relativeId: relativeId,
                updated: Date()
            })
            .where(`id = ${JSON.stringify(imageId)}`)
            .execute();

        return newAudioPath;
    }

    //get image of letter for the relative
    getImagePath = async (imageId: string) => {
        let imagePath = await this.LetterImageRepository.createQueryBuilder().select('image_path AS imagePath').addSelect('letter').addSelect('user_id AS userId').where(`id= "${imageId}"`).getRawMany()
        if (imagePath.length === 0) {
            return false
        }
        imagePath[0].letter = ChangeLetterClient[imagePath[0].letter]
        return imagePath[0];
    }

    //check the status and score of the image the child sent to be sure if show it or not
    responseCheck = async (id: string) => {
        let letter = await this.LetterImageRepository.createQueryBuilder().select('letter').addSelect('user_id AS userId').addSelect('image_status AS imageStatus').where(`id= "${id}"`).getRawMany()
        if (letter.length === 0) {
            return false
        }
        const responseAndScore = {
            imageStatus: letter[0].imageStatus,
            userId: letter[0].userId
        }
        return responseAndScore;
    }

    //if there is a new response, pass arr of obj with image id, image path, responseAudioPath and relativeId
    checkResponse = async (userId: string) => {
        let response = await this.LetterImageRepository.createQueryBuilder().select('id').addSelect('image_status AS imageStatus').addSelect('image_path AS imagePath').addSelect('response_audio_path AS responseAudioPath').addSelect('relative_id AS relativeId').addSelect('letter').where(`is_new_response = 1`).andWhere(`user_id=${JSON.stringify(userId)}`).getRawMany()
        for (let i = 0; i < response.length; i++) {
            response[i].letter = ChangeLetterClient[response[i].letter]
        }
        return response;
    }

    //update isNewResponse to 0 after the child saw the response
    UpdateNewResponse = async (imageId: string) => {
        await this.LetterImageRepository
            .createQueryBuilder()
            .update(LetterImage)
            .set({
                isNewResponse: false,
                updated: Date()
            })
            .where(`id = ${JSON.stringify(imageId)}`)
            .execute();
    }
    updated = async (imageId: string) => {
        await this.LetterImageRepository
            .createQueryBuilder()
            .update(LetterImage)
            .set({
                updated: Date()
            })
            .where(`id = ${JSON.stringify(imageId)}`)
            .execute();
    }

    //remove image from DB 
    removeImage = async (imageId: string) => {
        let imageDetails = await this.LetterImageRepository.createQueryBuilder().select('id').addSelect('created').addSelect('updated').addSelect('image_status AS imageStatus').addSelect('image_path AS imagePath').addSelect('response_audio_path AS responseAudioPath').addSelect('relative_id AS relativeId').addSelect('letter').addSelect('user_id AS userId').where(`id = ${JSON.stringify(imageId)}`).getRawMany()
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(LetterImage)
            .where(`id = ${JSON.stringify(imageId)}`)
            .execute();
        return imageDetails;

    }

    //change remind to 0 after press X on exclamation mark
    stopReminding = async (imageId: string) => {
        let remind = await this.LetterImageRepository
            .createQueryBuilder()
            .update(LetterImage)
            .set({
                remind: false,
                updated: Date()
            })
            .where(`id = ${JSON.stringify(imageId)}`)
            .execute();
        return;
    }

    //check if someone else responed image
    async ifResponed(imageId: string) {
        const imageIdExists = await this.LetterImageRepository.createQueryBuilder().select('id').where(`id=${JSON.stringify(imageId)}`).getRawMany()
        if (imageIdExists.length === 0) {
            return 'imageId not exists'
        } else {
            const responed = await this.LetterImageRepository.createQueryBuilder().select('id').where(`id=${JSON.stringify(imageId)}`).andWhere('relative_id is not null').getRawMany()
            if (responed.length > 0) {
                return true
            } else {
                return false
            }
        }
    }
}
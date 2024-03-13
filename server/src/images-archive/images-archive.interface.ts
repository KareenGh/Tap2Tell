import { Letters, Status } from "src/letter-image/letter-image.interface";

export interface imageDetails {
    id: string,
    created: Date,
    updated: Date,
    imageStatus: Status,
    imagePath: string,
    responseAudioPath: string,
    relativeId: string,
    letter: Letters,
    userId: string
}
import { Column, Entity, CreateDateColumn, PrimaryColumn, Generated, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Letters, Status } from './letter-image.interface'


@Entity()
export class LetterImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @CreateDateColumn()
    updated: Date;

    @Column({
        length: 100,
        default: 0,
        nullable: true,
        type: "varchar",
        name: 'response_audio_path'
    })
    responseAudioPath: string | null;

    @Column({
        length: 100,
        default: null,
        nullable: true,
        type: "varchar",
        name: 'image_path'
    })
    imagePath: string | null;


    @Column({
        default: null,
        length: 100,
        nullable: true,
        type: "varchar",
        name: 'relative_id'
    })
    relativeId: string;

    @Column('uuid',{
        default: null,
        nullable: true,
        name: 'user_id'
    })
    userId: string;


    @Column('tinyint', {
        default: 0,
        name: 'is_new_response'
    })
    isNewResponse: boolean;

    @Column({
        type: "enum",
        enum: Letters
    })
    letter: Letters;


    @Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING,
        name: 'image_status'
    })
    imageStatus: Status;

    @Column('tinyint', {
        default: 1,
        name: 'remind'
    })
    remind: boolean;
    


}
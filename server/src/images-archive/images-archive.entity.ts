import { Letters, Status } from 'src/letter-image/letter-image.interface';
import { Column, Entity, CreateDateColumn, PrimaryColumn, Generated, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity()
export class ImageArchive {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created: Date;

    @Column({
        type: 'uuid',
        nullable: true,
        name: 'image_id'
    })
    imageId: string

    @Column({ name: 'image_created' })
    imageCreated: Date;

    @Column({ name: 'image_updated' })
    imageUpdated: Date;

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

    @Column({ name: 'user_id', type: 'uuid' })
    userId: string;

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

}
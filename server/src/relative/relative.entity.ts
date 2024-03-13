import { Column, Entity, PrimaryColumn, CreateDateColumn, Generated, PrimaryGeneratedColumn } from 'typeorm';
import {Matches} from 'class-validator'

@Entity()
export class Relative {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    // @Column({ default: 0 })
    // emailVerified: boolean

    @CreateDateColumn()
    created: Date;

    @Column({
        length: 100,
        nullable: true,
        name: 'relative_image_path'
    })
    relativeImagePath: string;

    @Matches(/^[A-Za-z\u0590-\u05EA"'-\.\s]+$/)
    @Column({ length: 40, name: 'relative_name' })
    relativeName: string

    @Column('uuid', {
        nullable: true,
        name: 'device_id'
    })
    deviceId: string;

    @Column()
    type: string;
}
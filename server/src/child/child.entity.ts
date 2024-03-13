import { ChildEntity, Column } from 'typeorm';
import { User } from '@hilma/auth-nest';
import { Matches } from 'class-validator'
@ChildEntity()
export class Child extends User {
    constructor(basicUser: Partial<Child> = {}) {
        super(basicUser);
        this.emailVerified = basicUser.emailVerified;
        this.fullName = basicUser.fullName;
        this.emailVerified = basicUser.emailVerified ? basicUser.emailVerified : 0;
    }

    @Column({ default: 0, type: "tinyint" })
    emailVerified: number

    @Column({ nullable: true, length: 150 })
    verificationToken: string

    @Matches(/^[A-Za-z\u0590-\u05EA"'-\.\s]+$/)
    @Column({
        // name: 'fulls_name'
    })
    fullName: string

}
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

export enum UserRole {
    ADMIN = "admin",
    STANDARD = "standard",
}

@Entity()
@Unique(["email"])
@Unique(["token"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    // Disabled for sqlite. Enable for postgres
    // @Column({
    //     type: "enum",
    //     enum: UserRole,
    //     default: UserRole.STANDARD,
    // })
    // role: UserRole
    @Column()
    role: string

    @Column()
    token: string
}

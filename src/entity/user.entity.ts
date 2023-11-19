import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

export enum UserRole {
    ADMIN = "admin",
    STANDARD = "standard",
}

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    role: string

    @Column()
    token: string
}

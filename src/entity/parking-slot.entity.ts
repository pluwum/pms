import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"
import { User } from "./user.entity"

export enum ParkingSlotStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

@Entity()
export class ParkingSlot {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string

    //TODO: make this unique
    @Column()
    name: string

    @Column()
    status: string

    @Column({ nullable: true })
    status_reason: string

    @Column()
    createdBy: string

    @CreateDateColumn()
    createdAt: Date

    @Column({ nullable: true })
    updatedBy: string

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date
}

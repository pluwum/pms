import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
} from "typeorm"

export enum ParkingSlotStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

@Entity()
@Unique(["name"])
export class ParkingSlot {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string

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

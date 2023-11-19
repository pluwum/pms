import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { User } from "../user/user.entity"
import { ParkingSlot } from "../parking-slot/parking-slot.entity"

@Entity()
export class Booking {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => ParkingSlot, (slot) => slot.id)
    slot: ParkingSlot

    @ManyToOne((type) => User, (user) => user.id)
    ownedBy: User

    @Column()
    startsAt: Date

    @Column()
    endsAt: Date

    @Column()
    createdBy: string

    @CreateDateColumn()
    createdAt: Date

    @Column()
    updatedBy: string

    @UpdateDateColumn()
    updatedAt: Date
}

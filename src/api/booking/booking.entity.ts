import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { ParkingSlot } from "../parking-slot/parking-slot.entity"
import { User } from "../user/user.entity"

@Entity()
export class Booking {
  @Column()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ nullable: false })
  slotId: string

  @ManyToOne(() => ParkingSlot, (slot) => slot.id, { nullable: false })
  slot: ParkingSlot

  @ManyToOne((type) => User, (user) => user.id, { nullable: false })
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

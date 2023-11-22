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
  // UnComment this to use enum. This is not supported with Sqlite
  // @Column({
  //     type: "enum",
  //     enum: ParkingSlotStatus,
  //     default: ParkingSlotStatus.ACTIVE,
  // })
  // status: ParkingSlotStatus

  // Comment this when the above enum is in use.
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

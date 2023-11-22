import { IsDateString, IsOptional, IsUUID } from "class-validator"
import { ParkingSlot } from "../../parking-slot/parking-slot.entity"
import { User } from "../../user/user.entity"

export class CreateBookingDTO {
  @IsUUID()
  slotId: ParkingSlot

  @IsUUID()
  @IsOptional()
  ownedBy: User

  @IsDateString()
  startsAt: Date

  @IsDateString()
  endsAt: Date
}

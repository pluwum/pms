import { IsUUID, IsDateString, IsOptional } from "class-validator"
import { ParkingSlot } from "../../parking-slot/parking-slot.entity"
import { User } from "../../user/user.entity"

export class UpdateBookingDTO {
  @IsUUID()
  @IsOptional()
  slotId: ParkingSlot

  @IsOptional()
  @IsUUID()
  ownedBy: User

  @IsOptional()
  @IsDateString()
  startsAt: Date

  @IsOptional()
  @IsDateString()
  endsAt: Date
}

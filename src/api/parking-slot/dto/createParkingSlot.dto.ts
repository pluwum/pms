import { IsOptional, IsString, IsEnum } from "class-validator"
import { ParkingSlotStatus } from "../parking-slot.entity"

export class CreateParkingSlotDTO {
  @IsString()
  name: string

  @IsString()
  @IsEnum(ParkingSlotStatus)
  @IsOptional()
  status: ParkingSlotStatus

  @IsString()
  @IsOptional()
  status_reason: Date
}

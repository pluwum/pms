import { IsDateString, IsOptional, IsString, IsEnum } from "class-validator"
import { ParkingSlotStatus } from "../parking-slot.entity"

export class UpdateParkingSlotDTO {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsEnum(ParkingSlotStatus)
    @IsOptional()
    status: ParkingSlotStatus

    @IsString()
    @IsOptional()
    status_reason: Date
}

import { IsUUID, IsDate, IsDateString, IsOptional } from "class-validator"

export class CreateBookingDTO {
    @IsUUID()
    slotId: string

    @IsUUID()
    @IsOptional()
    ownedBy: string

    @IsDateString()
    startsAt: Date

    @IsDateString()
    endsAt: Date
}

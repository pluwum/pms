import { IsUUID, IsDate } from "class-validator"

export class CreateBookingDTO {
    @IsUUID()
    slotId: string

    @IsUUID()
    ownedBy: string

    @IsDate()
    startsAt: Date

    @IsDate()
    endsAt: Date
}

import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Booking } from "../entity/booking.entity"

export class BookingController {
    private bookingRepository = AppDataSource.getRepository(Booking)

    async create(request: Request, response: Response, next: NextFunction) {
        const today = new Date()
        const twoDaysLater = new Date()

        twoDaysLater.setDate(today.getDate() + 2)

        const {
            slotId,
            ownedBy = "someUser",
            startsAt = today,
            endsAt = twoDaysLater,
            createdBy = "userFromSession",
            updatedBy = "userFromSession",
        } = request.body

        const booking = Object.assign(new Booking(), {
            slot: slotId,
            ownedBy,
            startsAt,
            endsAt,
            createdBy,
            updatedBy,
        })

        try {
            const { slot, ...newBooking } = await this.bookingRepository.save(
                booking
            )
            return {
                data: { slotId: slot, ...newBooking },
                statusCode: 201,
            }
        } catch (error) {
            console.log(error)
            return { message: error.message, statusCode: 500 }
        }
    }
}

import { AppDataSource } from "../../data-source"
import { Booking } from "./booking.entity"

export class BadInputException extends Error {
    public statusCode: number

    constructor({ message, statusCode }) {
        super(message)
        this.statusCode = statusCode
        this.name = "BadInputException"
    }
}
export class OperationFailedException extends Error {
    public statusCode: number

    constructor({ message, statusCode }) {
        super(message)
        this.statusCode = statusCode
        this.name = "OperationFailedException"
    }
}
export class BookingService {
    private bookingRepository = AppDataSource.getRepository(Booking)

    async createBooking(bookingData): Promise<Booking> {
        if (bookingData.startsAt >= bookingData.endsAt) {
            throw new BadInputException({
                message: "Start date must be before end date",
                statusCode: 400,
            })
        }
        if (bookingData.startsAt < new Date()) {
            throw new BadInputException({
                message: "Start date must be in the future",
                statusCode: 400,
            })
        }

        const newBooking = Object.assign(new Booking(), bookingData)

        try {
            const booking = await this.bookingRepository.save(newBooking)
            return booking
        } catch (error) {
            throw new OperationFailedException({
                message: error.message,
                statusCode: 500,
            })
        }
    }
}

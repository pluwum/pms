import { AppDataSource } from "../../data-source"
import { isAdmin } from "../../utils"
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
export class NotFoundException extends Error {
    public statusCode: number

    constructor({ message, statusCode }) {
        super(message)
        this.statusCode = statusCode
        this.name = "NotFoundException"
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
    async updateBooking(bookingId, bookingUpdates, user): Promise<Booking> {
        const where = isAdmin(user) ? {} : { createdBy: user.id }

        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId, ...where },
        })

        if (!booking) {
            throw new NotFoundException({
                statusCode: 404,
                message: "Booking is not found",
            })
        }

        const { slotId, ...updates } = bookingUpdates

        this.bookingRepository.merge(booking, { slot: slotId, ...updates })

        try {
            const updatedBooking = await this.bookingRepository.save(booking)
            return updatedBooking
        } catch (error) {
            throw new OperationFailedException({
                message: error.message,
                statusCode: 500,
            })
        }
    }
    async deleteBooking(bookingId, user): Promise<Booking> {
        const where = isAdmin(user) ? {} : { createdBy: user.id }

        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId, ...where },
        })

        if (!booking) {
            throw new NotFoundException({
                statusCode: 404,
                message: "Booking is not found",
            })
        }

        try {
            const deletedBooking = await this.bookingRepository.remove(booking)
            return deletedBooking
        } catch (error) {
            throw new OperationFailedException({
                message: error.message,
                statusCode: 500,
            })
        }
    }

    async getBookings(user): Promise<Booking[]> {
        const where = isAdmin(user) ? {} : { createdBy: user.id }
        const bookings = await this.bookingRepository.find({
            where,
            relations: ["slot", "ownedBy"],
        })

        return bookings
    }
}

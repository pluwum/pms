import { AppDataSource } from "../../data-source"
import { isAdmin } from "../../utils"
import {
    BadInputException,
    OperationFailedException,
    NotFoundException,
} from "../exceptions"
import { Booking } from "./booking.entity"

export class BookingService {
    private bookingRepository = AppDataSource.getRepository(Booking)

    async createBooking(bookingData): Promise<Booking> {
        this.validateDates(bookingData.startsAt, bookingData.endsAt)
        await this.validateSlotAvailability(
            bookingData.slot,
            bookingData.startsAt,
            bookingData.endsAt
        )

        const newBooking = Object.assign(new Booking(), bookingData)

        try {
            const booking = await this.bookingRepository.save(bookingData)
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

        this.bookingRepository.merge(booking, updates)

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
            relations: ["ownedBy"],
        })

        return bookings
    }

    async getBookingById(bookingId, user): Promise<Booking> {
        const where = isAdmin(user) ? {} : { createdBy: user.id }
        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId, ...where },
            relations: ["ownedBy"],
        })

        if (!booking) {
            throw new NotFoundException({
                statusCode: 404,
                message: "Booking is not found",
            })
        }

        return booking
    }

    async isSlotAvailable(
        slotId: number,
        startsAt: Date,
        endsAt: Date
    ): Promise<boolean> {
        const overlappingBooking = await this.bookingRepository
            .createQueryBuilder("booking")
            .where("booking.slot = :slotId", { slotId })
            .andWhere("booking.startsAt < :endDate", { endsAt })
            .andWhere("booking.endsAt > :startDate", { startsAt })
            .getOne()

        return !overlappingBooking
    }

    private validateDates(startsAt: Date, endsAt: Date) {
        if (startsAt >= endsAt) {
            throw new BadInputException({
                message: "Start date must be before end date",
                statusCode: 400,
            })
        }

        if (startsAt < new Date()) {
            throw new BadInputException({
                message: "Start date must be in the future",
                statusCode: 400,
            })
        }
    }

    private async validateSlotAvailability(
        slotId: number,
        startsAt: Date,
        endsAt: Date
    ) {
        if (!(await this.isSlotAvailable(slotId, startsAt, endsAt))) {
            throw new BadInputException({
                message: "Slot is not available",
                statusCode: 400,
            })
        }
    }
}

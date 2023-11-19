import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Booking } from "../entity/booking.entity"
import { isAdmin } from "../utils"

export class BookingController {
    private bookingRepository = AppDataSource.getRepository(Booking)

    async all(request: Request, response: Response, next: NextFunction) {
        const where = isAdmin(request.user)
            ? {}
            : { createdBy: request.user.id }
        const bookings = await this.bookingRepository.find({
            where,
            relations: ["slot", "ownedBy"],
        })

        const modifiedBookings = bookings.map(
            ({ slot, ownedBy, ...booking }) => {
                return {
                    ...booking,
                    slotId: slot.id,
                    ownedBy: ownedBy.id,
                }
            }
        )

        return {
            data: modifiedBookings,
            statusCode: 200,
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id
        const where = isAdmin(request.user)
            ? {}
            : { createdBy: request.user.id }

        const booking = await this.bookingRepository.findOne({
            where: { id, ...where },
            relations: ["slot", "ownedBy"],
        })

        if (!booking) {
            return { statusCode: 404, message: "Booking not found" }
        }
        const { ownedBy, slot, ...rest } = booking
        return {
            data: { ownedBy: ownedBy.id, slotId: slot.id, ...rest },
            statusCode: 200,
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id
        const where = isAdmin(request.user)
            ? {}
            : { createdBy: request.user.id }
        let bookingToRemove = await this.bookingRepository.findOneBy({
            id,
            ...where,
        })

        if (!bookingToRemove) {
            return {
                message: "This booking does not exist",
                statusCode: 404,
            }
        }

        await this.bookingRepository.remove(bookingToRemove)

        return {
            message: "Booking has been removed",
            statusCode: 200,
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const {
            slotId,
            ownedBy = request.user.id,
            startsAt,
            endsAt,
            createdBy = request.user.id,
            updatedBy = request.user.id,
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
            return { message: error.message, statusCode: 500 }
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id
        const where = isAdmin(request.user)
            ? {}
            : { createdBy: request.user.id }

        const booking = await this.bookingRepository.findOne({
            where: { id, ...where },
        })

        if (!booking) {
            return { statusCode: 404, message: "Booking is not found" }
        }

        const { slotId: slot, ...updates } = request.body

        this.bookingRepository.merge(booking, { slot, ...updates })

        try {
            const { slot: slotId, ...newBooking } =
                await this.bookingRepository.save(booking)
            return {
                data: { slotId, ...newBooking },
                statusCode: 200,
            }
        } catch (error) {
            return { message: error.message, statusCode: 500 }
        }
    }
}

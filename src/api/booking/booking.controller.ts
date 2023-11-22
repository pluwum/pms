import { Request } from "express"
import { formatValidationErrors } from "../../utils"
import { plainToClass } from "class-transformer"
import { CreateBookingDTO } from "./dto/createBooking.dto"
import { validate } from "class-validator"
import { UpdateBookingDTO } from "./dto/updateBooking.dto"
import { BookingService } from "./booking.service"

export class BookingController {
    private bookingService = new BookingService()

    async all(request: Request) {
        const bookings = await this.bookingService.getBookings(request.user)

        const modifiedBookings = bookings.map(({ ownedBy, ...booking }) => {
            return {
                ...booking,
                ownedBy: ownedBy.id,
            }
        })

        return {
            data: modifiedBookings,
            statusCode: 200,
        }
    }

    async one(request: Request) {
        const id = request.params.id

        const booking = await this.bookingService.getBookingById(
            id,
            request.user
        )

        const { ownedBy, ...rest } = booking

        return {
            data: { ownedBy: ownedBy.id, ...rest },
            statusCode: 200,
        }
    }

    async remove(request: Request) {
        const id = request.params.id

        try {
            await this.bookingService.deleteBooking(id, request.user)
            return {
                message: "Booking has been removed",
                statusCode: 200,
            }
        } catch (error) {
            return { message: error.message, statusCode: error.statusCode }
        }
    }

    async create(request: Request) {
        const createBookingDto = plainToClass(CreateBookingDTO, request.body)
        const errors = await validate(createBookingDto)

        if (errors.length > 0) {
            return { message: formatValidationErrors(errors), statusCode: 400 }
        }

        try {
            const newBooking = await this.bookingService.createBooking({
                ...createBookingDto,
                ownedBy: createBookingDto.ownedBy || request.user.id,
                createdBy: request.user.id,
                updatedBy: request.user.id,
            })
            return {
                data: newBooking,
                statusCode: 201,
            }
        } catch (error) {
            return { message: error.message, statusCode: error.statusCode }
        }
    }

    async update(request: Request) {
        const id = request.params.id
        const bookingUpdates = plainToClass(UpdateBookingDTO, request.body)
        const errors = await validate(bookingUpdates)

        if (errors.length > 0) {
            return { message: formatValidationErrors(errors), statusCode: 400 }
        }

        try {
            const updatedBooking = await this.bookingService.updateBooking(
                id,
                bookingUpdates,
                request.user
            )
            return {
                data: updatedBooking,
                statusCode: 200,
            }
        } catch (error) {
            return { message: error.message, statusCode: error.statusCode }
        }
    }
}

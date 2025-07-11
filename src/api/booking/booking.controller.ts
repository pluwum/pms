import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { type Request } from "express"
import { formatValidationErrors } from "../../utils"
import { type RouteHandlerResponse } from "../types"
import { BookingService } from "./booking.service"
import { CreateBookingDTO } from "./dto/createBooking.dto"
import { UpdateBookingDTO } from "./dto/updateBooking.dto"

export class BookingController {
  private readonly bookingService = new BookingService()

  async all(request: Request): Promise<RouteHandlerResponse> {
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

  async one(request: Request): Promise<RouteHandlerResponse> {
    const id = request.params.id

    const booking = await this.bookingService.getBookingById(id, request.user)

    const { ownedBy, ...rest } = booking

    return {
      data: { ownedBy: ownedBy.id, ...rest },
      statusCode: 200,
    }
  }

  async remove(request: Request): Promise<RouteHandlerResponse> {
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

  async create(request: Request): Promise<RouteHandlerResponse> {
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

  async update(request: Request): Promise<RouteHandlerResponse> {
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

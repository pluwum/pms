import { AppDataSource } from "../data-source"
import { Booking } from "../api/booking/booking.entity"
import "reflect-metadata"
import { v4 as uuidv4 } from "uuid"
import { ParkingSlot } from "../api/parking-slot/parking-slot.entity"
import { User } from "../api/user/user.entity"

export const fakeBookings: Partial<Booking>[] = [
    {
        id: "4e52b5e2-8c84-4f02-9f1d-4e3c3b6f8f3b",
        createdAt: new Date(),
        createdBy: "userFromSession",
        updatedAt: new Date(),
        updatedBy: "userFromSession",
    },
    {
        id: "7a2b1584-6c74-4b79-8c63-034b951bfbce",
        createdAt: new Date(),
        createdBy: "userFromSession",
        updatedAt: new Date(),
        updatedBy: "userFromSession",
    },
]

export const singleBooking = {
    id: uuidv4(),
    createdAt: new Date(),
    createdBy: "userFromSession",
    updatedAt: new Date(),
    updatedBy: "userFromSession",
    slot: new ParkingSlot(), //
    ownedBy: new User(),
    startsAt: new Date(),
    endsAt: new Date(),
}
export const createBooking = async ({
    booking = singleBooking,
    owner,
    parkingSlot,
}: {
    booking?: Booking
    owner: any
    parkingSlot: any
}): Promise<Booking> => {
    const { startsAt, endsAt } = createBookingStartAndEndDates()
    return await AppDataSource.manager.save(
        AppDataSource.manager.create(Booking, {
            ...booking,
            ownedBy: owner,
            createdBy: owner.id,
            slot: parkingSlot,
            startsAt,
            endsAt,
        })
    )
}
export const createBookingStartAndEndDates = (): {
    startsAt: Date
    endsAt: Date
} => {
    const today = new Date()
    const twoDaysLater = new Date()
    const oneDayLater = new Date()

    twoDaysLater.setDate(today.getDate() + 2)
    oneDayLater.setDate(today.getDate() + 1)
    return { startsAt: oneDayLater, endsAt: twoDaysLater }
}

export const createManyBookings = async (parkingSlot, owner): Promise<void> => {
    const { startsAt, endsAt } = createBookingStartAndEndDates()
    const bookings = fakeBookings.map((booking) => {
        return {
            ...booking,
            slot: parkingSlot,
            ownedBy: owner,
            createdBy: owner.id,
            startsAt,
            endsAt,
        }
    })
    try {
        await AppDataSource.manager.insert(Booking, bookings)
    } catch (error) {
        console.error(error)
    }
}

import request from "supertest"
import server from "../../server"
import { initializeDb } from "../../data-source"
import {
    createManyParkingSlots,
    createParkingSlot,
    fakeParkingSlots,
} from "../../scripts/parking-slot"
import { createUser, singleUser } from "../../scripts/users"
import {
    createBooking,
    createBookingStartAndEndDates,
    createManyBookings,
} from "../../scripts/bookings"

describe("Route /bookings", () => {
    beforeAll(async () => {
        await initializeDb()
        await createUser(singleUser)
        await createManyParkingSlots(fakeParkingSlots)
    })

    it("GET /bookings should return all bookings", async () => {
        const singleParkingSlot = await createParkingSlot()
        await createManyBookings(singleParkingSlot, singleUser)

        const response = await request(server)
            .get("/api/v1/bookings/")
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body.data).toHaveLength(2)
    })

    it("POST /bookings should create a booking", async () => {
        const { startsAt, endsAt } = createBookingStartAndEndDates()
        const parkingSlot = await createParkingSlot()
        const response = await request(server)
            .post("/api/v1/bookings")
            .send({
                slotId: parkingSlot.id,
                ownedBy: singleUser.id,
                startsAt,
                endsAt,
            })
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(201)
        expect(response.body.data).toMatchObject({
            slotId: parkingSlot.id,
            ownedBy: singleUser.id,
        })
    })

    it("GET /bookings/:id should return a booking", async () => {
        const parkingSlot = await createParkingSlot()
        const booking = await createBooking({ parkingSlot, owner: singleUser })
        const response = await request(server)
            .get(`/api/v1/bookings/${booking.id}`)
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body.data).toEqual({
            id: booking.id,
            slotId: booking.slotId,
            ownedBy: booking.ownedBy.id,
            startsAt: booking.startsAt.toISOString(),
            endsAt: booking.endsAt.toISOString(),
            createdAt: booking.createdAt.toISOString(),
            createdBy: booking.createdBy,
            updatedAt: booking.updatedAt.toISOString(),
            updatedBy: booking.updatedBy,
        })
    })

    it("DELETE /bookings/:id should remove a booking", async () => {
        const parkingSlot = await createParkingSlot()
        const booking = await createBooking({
            parkingSlot,
            owner: singleUser,
        })

        const response = await request(server)
            .delete(`/api/v1/bookings/${booking.id}`)
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            message: "Booking has been removed",
            statusCode: 200,
        })
    })

    it("PATCH /bookings/:id should update a parking slot", async () => {
        const firstParkingSlot = await createParkingSlot()
        const booking = await createBooking({
            parkingSlot: firstParkingSlot,
            owner: singleUser,
        })
        const secondParkingSlot = await createParkingSlot()
        const response = await request(server)
            .patch(`/api/v1/bookings/${booking.id}`)
            .send({
                slotId: secondParkingSlot.id,
            })
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body.data).toMatchObject({
            id: booking.id,
            slotId: secondParkingSlot.id,
        })
    })
})

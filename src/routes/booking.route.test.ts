import request from "supertest"
import server from "../server"
import { initializeDb } from "../data-source"
import {
    createManyParkingSlots,
    createParkingSlot,
    fakeParkingSlots,
} from "../scripts/parking-slot"
import { createUser, singleUser } from "../scripts/users"
import { createBooking, createManyBookings } from "../scripts/bookings"

describe("Route /bookings", () => {
    beforeAll(async () => {
        await initializeDb()
        await createUser(singleUser)
        await createManyParkingSlots(fakeParkingSlots)
    })

    it("POST /bookings should create a booking", async () => {
        const parkingSlot = await createParkingSlot()
        const response = await request(server)
            .post("/bookings")
            .send({
                slotId: parkingSlot.id,
                ownedBy: singleUser.id,
            })
            .set("Content-Type", "application/json")
            .set("Authorization", singleUser.token)

        expect(response.status).toBe(201)

        expect(response.body.data).toMatchObject({
            slotId: parkingSlot.id,
            ownedBy: singleUser.id,
        })
    })

    it("GET /bookings should return all bookings", async () => {
        const singleParkingSlot = await createParkingSlot()
        await createManyBookings(singleParkingSlot, singleUser)

        const response = await request(server)
            .get("/bookings/")
            .set("Content-Type", "application/json")
            .set("Authorization", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body.data).toHaveLength(2)
    })
    it("GET /bookings/:id should return a booking", async () => {
        const parkingSlot = await createParkingSlot()
        const booking = await createBooking({ parkingSlot, owner: singleUser })
        const response = await request(server)
            .get(`/bookings/${booking.id}`)
            .set("Content-Type", "application/json")
            .set("Authorization", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body.data).toEqual({
            id: expect.any(String),
            slotId: expect.any(String),
            ownedBy: expect.any(String),
            startsAt: expect.any(String),
            endsAt: expect.any(String),
            createdAt: expect.any(String),
            createdBy: expect.any(String),
            updatedAt: expect.any(String),
            updatedBy: expect.any(String),
        })
    })

    it("DELETE /bookings/:id should remove a booking", async () => {
        const parkingSlot = await createParkingSlot()
        const booking = await createBooking({
            parkingSlot,
            owner: singleUser,
        })

        const response = await request(server)
            .delete(`/bookings/${booking.id}`)
            .set("Content-Type", "application/json")
            .set("Authorization", singleUser.token)

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
            .patch(`/bookings/${booking.id}`)
            .send({
                slotId: secondParkingSlot.id,
            })
            .set("Content-Type", "application/json")
            .set("Authorization", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body.data).toMatchObject({
            id: booking.id,
            slotId: secondParkingSlot.id,
        })
    })
})

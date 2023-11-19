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
})

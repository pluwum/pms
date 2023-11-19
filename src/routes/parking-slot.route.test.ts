import request from "supertest"
import server from "../server"
import { initializeDb } from "../data-source"
import {
    createManyParkingSlots,
    createParkingSlot,
    fakeParkingSlots,
} from "../scripts/parking-slot"
import { createUser, singleUser } from "../scripts/users"
import { ParkingSlotStatus } from "../entity/parking-slot.entity"

describe("Route /parking-slots", () => {
    beforeAll(async () => {
        await initializeDb()
        await createUser(singleUser)
    })
    it("GET /parking-slots should return all parking slots", async () => {
        await createManyParkingSlots(fakeParkingSlots)

        const response = await request(server)
            .get("/parking-slots/")
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body.data).toEqual([
            {
                id: expect.any(String),
                name: "East Wing #1",
                status: ParkingSlotStatus.ACTIVE,
                status_reason: null,
                createdAt: expect.any(String),
                createdBy: "userFromSession",
                updatedAt: expect.any(String),
                updatedBy: "userFromSession",
            },
            {
                id: expect.any(String),
                name: "East Wing #2",
                status: ParkingSlotStatus.ACTIVE,
                status_reason: null,
                createdAt: expect.any(String),
                createdBy: "userFromSession",
                updatedAt: expect.any(String),
                updatedBy: "userFromSession",
            },
        ])
    })
    it("GET /parking-slots/:id should return a parking slot", async () => {
        const parkingSlot = await createParkingSlot()
        const response = await request(server)
            .get(`/parking-slots/${parkingSlot.id}`)
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body.data).toEqual({
            id: expect.any(String),
            name: "East Wing #4",
            status: ParkingSlotStatus.ACTIVE,
            status_reason: null,
            createdAt: expect.any(String),
            createdBy: "userFromSession",
            updatedAt: expect.any(String),
            updatedBy: "userFromSession",
        })
    })
    it("POST /parking-slots should create a parking slot", async () => {
        const response = await request(server)
            .post("/parking-slots")
            .send({
                name: "East Wing #3",
                status: ParkingSlotStatus.ACTIVE,
                status_reason: null,
            })
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(201)
        expect(response.body.data).toEqual({
            id: expect.any(String),
            name: "East Wing #3",
            status: ParkingSlotStatus.ACTIVE,
            status_reason: null,
            createdAt: expect.any(String),
            createdBy: singleUser.id,
            updatedAt: expect.any(String),
            updatedBy: singleUser.id,
        })
    })
    it("DELETE /parking-slots/:id should remove a parking slot", async () => {
        const parkingSlot = await createParkingSlot()

        const response = await request(server)
            .delete(`/parking-slots/${parkingSlot.id}`)
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            message: "parking slot has been removed",
            statusCode: 200,
        })
    })
    it("PATCH /parking-slots/:id should update a parking slot", async () => {
        const parkingSlot = await createParkingSlot()

        const response = await request(server)
            .patch(`/parking-slots/${parkingSlot.id}`)
            .send({
                name: "East Wing #5",
                status: ParkingSlotStatus.INACTIVE,
                status_reason: "testing",
            })
            .set("Content-Type", "application/json")
            .set("x-api-token", singleUser.token)

        expect(response.status).toBe(200)
        expect(response.body.data).toEqual({
            id: expect.any(String),
            name: "East Wing #5",
            status: ParkingSlotStatus.INACTIVE,
            status_reason: "testing",
            createdAt: expect.any(String),
            createdBy: "userFromSession",
            updatedAt: expect.any(String),
            updatedBy: "userFromSession",
        })
    })
})

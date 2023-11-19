import request from "supertest"
import server from "../server"
import { initializeDb } from "../data-source"
import { createManyUsers, fakerUsers } from "../scripts/users"

describe("Route /users", () => {
    beforeAll(async () => {
        await initializeDb()
        await createManyUsers(fakerUsers)
    })
    it("should return all registered users", async () => {
        const response = await request(server)
            .get("/users/")
            .set("Content-Type", "application/json")

        expect(response.status).toBe(200)
        expect(response.body.data).toEqual([
            {
                id: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
            },
            {
                id: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
            },
        ])
    })
})

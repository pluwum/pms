import request from "supertest"
import server from "../server"
import { initializeDb } from "../data-source"
import { createManyUsers, createUser, fakerUsers } from "../scripts/users"

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
    })
    it("should delete a user", async () => {
        const user = await createUser()

        const response = await request(server).delete(`/users/${user.id}`)

        expect(response.status).toBe(200)
    })
})

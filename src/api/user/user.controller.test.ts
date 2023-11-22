import request from "supertest"
import { initializeDb } from "../../data-source"
import { createManyUsers, createUser, fakerUsers } from "../../scripts/users"
import server from "../../server"

describe("Route /users", () => {
  beforeAll(async () => {
    await initializeDb()
    await createManyUsers(fakerUsers)
  })
  it("should return all registered users", async () => {
    const response = await request(server)
      .get("/api/v1/users/")
      .set("Content-Type", "application/json")

    expect(response.status).toBe(200)
  })
  it("should delete a user", async () => {
    const user = await createUser()

    const response = await request(server).delete(`/api/v1/users/${user.id}`)

    expect(response.status).toBe(200)
  })
})

import "reflect-metadata"
import { User } from "../api/user/user.entity"
import { AppDataSource } from "../data-source"

export const fakerUsers = [
  {
    id: "9f8e7d6c-5b4a-3c2d-1e0f-1234567890ab",
    firstName: "velva",
    lastName: "test",
    email: "luwum.patrick+test1@gmail.com",
    token: "velva1234567890",
    role: "admin",
  },
  {
    id: "f1e2d3c4-b5a6-7988-90ab-cdef12345678",
    firstName: "francesco",
    lastName: "test",
    email: "luwum.patrick+test2@gmail.com",
    token: "francesco1234567890",
    role: "admin",
  },
]

export const singleUser = {
  id: "0f9e8d7c-6b5a-4c3d-2e1f-0123456789ab",
  firstName: "Patrick",
  lastName: "Luwum",
  email: "luwum.patrick+test3@gmail.com",
  token: "luwum1234567890",
  role: "admin",
}
export const createUser = async (user = singleUser): Promise<User> => {
  return await AppDataSource.manager.save(
    AppDataSource.manager.create(User, user)
  )
}

export const createManyUsers = async (users): Promise<void> => {
  try {
    await AppDataSource.manager.insert(User, users)
  } catch (error) {
    console.error(error)
  }
}

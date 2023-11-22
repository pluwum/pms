import { type Request } from "express"
import { AppDataSource } from "../../data-source"
import { generateToken } from "../../utils"
import { type RouteHandlerResponse } from "../types"
import { User, UserRole } from "./user.entity"

export class UserController {
  private readonly userRepository = AppDataSource.getRepository(User)

  async all(): Promise<RouteHandlerResponse> {
    const users = await this.userRepository.find()

    return {
      data: users,
      statusCode: 200,
    }
  }

  async one(request: Request): Promise<RouteHandlerResponse> {
    const id = request.params.id

    const user = await this.userRepository.findOne({
      where: { id },
    })

    if (!user) {
      return { statusCode: 404, message: "unregistered user" }
    }
    return { data: user, statusCode: 200 }
  }

  async create(request: Request): Promise<RouteHandlerResponse> {
    const {
      firstName,
      lastName,
      email,
      token = generateToken(),
      role = UserRole.STANDARD,
    } = request.body

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      token,
      role,
    })

    try {
      const newUser = await this.userRepository.save(user)
      return {
        data: newUser,
        statusCode: 201,
      }
    } catch (error) {
      return { message: error.message, statusCode: 500 }
    }
  }

  async remove(request: Request): Promise<RouteHandlerResponse> {
    const id = request.params.id

    const userToRemove = await this.userRepository.findOneBy({ id })

    if (!userToRemove) {
      return { message: "this user does not exist", statusCode: 404 }
    }

    await this.userRepository.remove(userToRemove)

    return {
      message: "user has been removed",
      statusCode: 200,
    }
  }
}

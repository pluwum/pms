import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User, UserRole } from "../entity/user.entity"

export class UserController {
    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        const users = await this.userRepository.find()

        return {
            data: users,
            statusCode: 200,
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        const user = await this.userRepository.findOne({
            where: { id },
        })

        if (!user) {
            return { statusCode: 404, message: "unregistered user" }
        }
        return { data: user, statusCode: 200 }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const {
            firstName,
            lastName,
            email,
            token = "1234567890",
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
}

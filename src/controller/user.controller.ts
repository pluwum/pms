import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/user.entity"

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
}

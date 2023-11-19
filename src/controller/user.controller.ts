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
}

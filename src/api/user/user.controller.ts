import { AppDataSource } from "../../data-source"
import { Request } from "express"
import { User, UserRole } from "./user.entity"
import { generateToken } from "../../utils"
export class UserController {
    private userRepository = AppDataSource.getRepository(User)

    async all() {
        const users = await this.userRepository.find()

        return {
            data: users,
            statusCode: 200,
        }
    }

    async one(request: Request) {
        const id = request.params.id

        const user = await this.userRepository.findOne({
            where: { id },
        })

        if (!user) {
            return { statusCode: 404, message: "unregistered user" }
        }
        return { data: user, statusCode: 200 }
    }

    async create(request: Request) {
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

    async remove(request: Request) {
        const id = request.params.id

        let userToRemove = await this.userRepository.findOneBy({ id })

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

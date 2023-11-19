import crypto from "crypto"
import { UserRole } from "./entity/user.entity"

export const generateToken = (length = 48) => {
    return crypto.randomBytes(length).toString("hex")
}

export const isAdmin = (user) => {
    return user.role === UserRole.ADMIN
}

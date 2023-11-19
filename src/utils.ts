import crypto from "crypto"
import { UserRole } from "./entity/user.entity"
import { ValidationError } from "class-validator"

export const generateToken = (length = 48) => {
    return crypto.randomBytes(length).toString("hex")
}

export const isAdmin = (user) => {
    return user.role === UserRole.ADMIN
}

export const formatValidationErrors = (errors: ValidationError[]) => {
    const formattedErrors = errors.map((err) => {
        const constraints = err.constraints
        return {
            field: err.property,
            message: constraints
                ? Object.values(constraints)[0]
                : "Validation error",
        }
    })
    return formattedErrors
}

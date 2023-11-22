import { type ValidationError } from "class-validator"
import crypto from "crypto"
import { UserRole, type User } from "./api/user/user.entity"

export const generateToken = (length = 48): string => {
  return crypto.randomBytes(length).toString("hex")
}

export const isAdmin = (user: User): boolean => {
  return user.role === UserRole.ADMIN
}

export const formatValidationErrors = (
  errors: ValidationError[]
): Array<{ field: string; message: string }> => {
  const formattedErrors = errors.map((err) => {
    const constraints = err.constraints
    return {
      field: err.property,
      message: constraints ? Object.values(constraints)[0] : "Validation error",
    }
  })
  return formattedErrors
}

export const isFutureDate = (dateString): boolean => {
  return new Date(dateString).getTime() > new Date().getTime()
}

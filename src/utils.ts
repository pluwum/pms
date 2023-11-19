import crypto from "crypto"

export const generateToken = (length = 48) => {
    return crypto.randomBytes(length).toString("hex")
}

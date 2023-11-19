import express, { Express, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User, UserRole } from "./user/user.entity"
import { ControllerRoute } from "../types"

export const authenticate =
    (route: ControllerRoute) => async (req, res, next) => {
        if (!route.authenticate) {
            return next()
        }
        var token =
            req.headers["x-api-token"] ||
            req.headers["api-token"] ||
            req.headers["x-api-key"] ||
            req.headers["api-key"]

        if (token) {
            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOne({
                where: { token },
            })
            if (!user) {
                return res.status(403).send({
                    message: "Invalid token.",
                })
            }

            req.user = user
            req.token = token

            next()
        } else {
            return res.status(403).send({
                message: "No token provided.",
            })
        }
    }

export const authorize = (route: ControllerRoute) => (req, res, next) => {
    if (!route.authenticate) {
        return next()
    }
    if (!route.permissions.includes(req.user.role)) {
        return res.status(403).send({ message: "Insufficient permissions" })
    }
    next()
}

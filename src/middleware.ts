import express, { Express, Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/user.entity"

export const authenticate = (route) => async (req, res, next) => {
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
        res.status(403).send({
            message: "No token provided.",
        })
    }
}

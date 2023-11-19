import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifyToken = function (req, res, next) {
    var token =
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.headers["authorization"]

    if (token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            function (error, decodedToken) {
                if (error) {
                    res.status(403).send({
                        message: "Failed to authenticate token.",
                        error,
                    })
                } else {
                    req.decodedToken = decodedToken
                    next()
                }
            }
        )
    } else {
        res.status(403).send({
            message: "No token provided.",
        })
    }
}

export const doNothing = (req: Request, res: Response, next: Function) => next()

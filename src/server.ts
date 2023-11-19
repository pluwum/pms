import express, { Express, Request, Response } from "express"
import * as bodyParser from "body-parser"
import routes from "./api/routes"
import cors from "cors"
import { authenticate, authorize } from "./api/middleware"
import dotenv from "dotenv"

dotenv.config()
const server: Express = express()
const baseUrl = process.env.BASE_URL || "/api/v1"

server.use(bodyParser.json())
server.use(cors())
// register express routes from defined application routes
routes.forEach((route) => {
    route.route = `${baseUrl}${route.route}`
    server[route.method](
        route.route,
        authenticate(route),
        authorize(route),
        (req: Request, res: Response, next: Function) => {
            const result = new (route.controller as any)()[route.action](
                req,
                res,
                next
            )
            if (result instanceof Promise) {
                result.then((result) => {
                    if (result !== null && result !== undefined) {
                        const { statusCode = 200, ...rest } = result
                        res.status(result.statusCode).send({
                            statusCode,
                            ...rest,
                        })
                    }
                })
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        }
    )
})

export default server

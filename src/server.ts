/* eslint-disable new-cap */
import * as bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express"
import path from "path"
import swaggerUi from "swagger-ui-express"
import yaml from "yamljs"
import { authenticate, authorize } from "./api/middleware"
import routes from "./api/routes"

dotenv.config()
const server: Express = express()
const baseUrl = process.env.BASE_URL ?? "/api/v1"

const apiDocumentation = yaml.load(path.join(__dirname, "/docs/api.yaml"))
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation))

server.use(bodyParser.json())
server.use(cors())

// register express routes from defined application routes
routes.forEach((route) => {
  route.route = `${baseUrl}${route.route}`
  server[route.method](
    route.route,
    authenticate(route),
    authorize(route),
    (req: Request, res: Response, next: NextFunction) => {
      const result = new route.controller()[route.action](req, res, next)
      if (result instanceof Promise) {
        result
          .then((result) => {
            if (result !== null && result !== undefined) {
              const { statusCode = 200, ...rest } = result
              res.status(result.statusCode).send({
                statusCode,
                ...rest,
              })
            }
          })
          .catch((error) => {
            console.error(error)
            res.status(500).send({
              message: "Internal server error",
            })
          })
      } else if (result !== null && result !== undefined) {
        res.json(result)
      }
    }
  )
})

export default server

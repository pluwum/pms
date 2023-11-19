import dotenv from "dotenv"
import { initializeDb } from "../data-source"

dotenv.config()

initializeDb().then(async () => {
    //Create seed data
})

import dotenv from "dotenv"
import { initializeDb } from "../data-source"

dotenv.config()

initializeDb()
  .then(async () => {
    // Create seed data. call the scripts here
  })
  .catch((error) => {
    console.log(error)
  })

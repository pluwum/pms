import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import path from "path"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_NAME ?? "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "/**/*.entity.ts")],
  migrations: [],
  subscribers: [],
})

export const initializeDb = async (): Promise<DataSource> => {
  return await AppDataSource.initialize()
}

import { config } from "dotenv"
import { join } from "path"
import { DataSource } from "typeorm"

const port = process.env.DB_PORT as number | undefined

config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(__dirname, '/../../**/**/**.entity.ts')],
    logging: true,
    synchronize: true,
})
import { DataSource } from "typeorm";
import { User } from '../entity/user.entity'; // Adjust the path as necessary
import { Note } from "../entity/note.entity";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from '../constants/env'

const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    entities: [User, Note],
})

AppDataSource.initialize().then(() => {
    console.log("Successfully initializing Database ")
}).catch(() => {
    console.log("Failed to initializing database")
})

export default AppDataSource
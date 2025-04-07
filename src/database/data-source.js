import "reflect-metadata";
import { DataSource } from "typeorm";
import user from "../entities/user.js";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    port: 3306,
    password: "",
    database: "livrarialogusdev",
    entities: [user], 
    migrations: ["src/database/migrations/*.cjs"],
});

export { AppDataSource };
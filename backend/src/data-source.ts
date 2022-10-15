import { DataSource } from "typeorm"
import { Contact } from "./contacts/ContactEntity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/db/raga-blacklist.sqlite",
    synchronize: true,
    logging: false,
    entities: [
        Contact
    ],
    migrations: ["./src/migration/**/*.ts"],
});
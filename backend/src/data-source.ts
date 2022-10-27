import { DataSource } from "typeorm"
import { Contact } from "./contacts/ContactEntity";
import { Log } from "./logs/LogEntity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: __dirname + '/db/raga-blacklist.sqlite',
    synchronize: true,
    logging: false,
    entities: [
        Contact,
        Log
    ],
});
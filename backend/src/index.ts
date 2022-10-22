import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as fileUploader from "express-fileupload";
import routes from "./routes";
import { AppDataSource } from './data-source';


AppDataSource.initialize().then(async () => {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json())
        app.use(fileUploader());
        app.use("/", routes);
        app.listen(3000, () => {
          console.log("Server started on port 3000!");
        });
}).catch(error => console.log(error));
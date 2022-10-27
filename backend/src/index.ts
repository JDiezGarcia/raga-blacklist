import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as fileUploader from "express-fileupload";
import routes from "./routes";
import { AppDataSource } from './data-source';

export default AppDataSource.initialize().then(() => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use(fileUploader());
    app.use('/', express.static(__dirname + "/dist/raga-blacklist/"));
    app.use('/', routes);
    return new Promise((res) => {
        app.listen(3000, () => {
            console.log("Server started on port 3000");
            res(app);
        });
    });
}).catch(error => console.log(error));
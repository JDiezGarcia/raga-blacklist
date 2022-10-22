import { Router } from "express";
import contact from "./contact";
import log from "./log";

const routes = Router();

routes.use("/contact", contact);
routes.use("/log", log)

export default routes;
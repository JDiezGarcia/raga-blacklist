import { Router } from "express";
import contact from "./contact";

const routes = Router();

routes.use("/contact", contact);

export default routes;
import { Router } from 'express';
import contact from './contact';
import log from './log';
import db from './db'
const routes = Router();

routes.use('/contact', contact);
routes.use('/log', log);
routes.use('/db', db);

export default routes;
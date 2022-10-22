import { Request, Response } from "express";
import { validate } from "class-validator";
import { Log } from "./LogEntity";
import { AppDataSource } from "../data-source";

class LogController {

    static searchLogs = async (req: Request, res: Response) => {
        const logRepository = AppDataSource.getRepository(Log);
        const logs = await logRepository.find({
            skip: req.query.offset,
            take: req.query.limit,
            order: { dateLog: 'ASC' }
        });
        const status = logs.length > 0 ? 200 : 204
        res.status(status).send(logs);
    };

    static newLog = async (req: Request, res: Response) => {
        let log = new Log();
        log = req.body;
        const errors = await validate(log);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        const logRepository = AppDataSource.getRepository(Log);
        try {
            await logRepository.save(log);
        } catch (e) {
            res.status(409).send(e);
            return;
        }
        res.status(201).send("Log created");
    };

    static deleteLog = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const logRepository = AppDataSource.getRepository(Log);
        let log: Log;
        try {
            log = await logRepository.findOneByOrFail({ id });
        } catch (error) {
            res.status(404).send("Log not found");
            return;
        }
        logRepository.delete(id);
        res.status(200).send('Successfuly delete log!');
    };
};

export default LogController;
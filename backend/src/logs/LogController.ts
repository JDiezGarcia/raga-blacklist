import { Request, Response } from "express";
import { validate } from "class-validator";
import { Log } from "./LogEntity";
import { AppDataSource } from "../data-source";
import { Contact } from "../contacts/ContactEntity";

class LogController {

    static searchLogs = async (req: Request, res: Response) => {
        const logRepository = AppDataSource.getRepository(Log);
        const paginator = {
            skip: req.query.offset ? +req.query.offset : 0,
            take: req.query.limit ? +req.query.limit : 10
        }
        const contactRepository = AppDataSource.getRepository(Contact);
        try {
            const contact = await contactRepository.findOneByOrFail({ id: +req.params.id });
            const [logs, total] = await logRepository.findAndCount({
                where: {contact: {id: contact.id }},
                skip: paginator.skip,
                take: paginator.take,
                order: { dateLog: 'ASC' },
            });
            const status = logs.length > 0 ? 200 : 204
            res.status(status).send({logs, total});
        } catch (e) {
            res.status(409).send(e);
            return;
        }
    };

    static newLog = async (req: Request, res: Response) => {
        let log = new Log();
        const contactRepository = AppDataSource.getRepository(Contact);
        try {
            const contact = await contactRepository.findOneByOrFail({id: +req.params.id});
            log = {...req.body, contact: contact};
        } catch (e) {
            res.status(409).send(e);
            return;
        }

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
        res.status(201).send({success:"Log created"});
    };

    static deleteLog = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const logRepository = AppDataSource.getRepository(Log);
        let log: Log;
        try {
            log = await logRepository.findOneByOrFail({ id });
        } catch (error) {
            res.status(404).send({ error: "Log not found"});
            return;
        }
        logRepository.delete(id);
        res.status(200).send({ success: 'Successfuly delete log!'});
    };
};

export default LogController;
import { ContactFilters } from './ContactInterface';
import { Request, Response } from "express";
import { validate } from "class-validator";
import { Contact } from "./ContactEntity";
import { AppDataSource } from "../data-source";
import { ErrorType, TypeResponseErrors } from "../models/error";
import { ErrorHelper } from "../helpers/errors.helper";
import { Like } from 'typeorm';

class ContactController {

    static searchContacts = async (req: Request, res: Response) => {
        const contactRepository = AppDataSource.getRepository(Contact);
        let params: ContactFilters = {};
        Object.keys(req.query).forEach(key => {
            if(key !== 'limit' && key !== 'offset' ){
                params[key] = Like(`%${req.query[key]}%`);
            }
        });
        const paginator = {
            skip: req.query.offset ? +req.query.offset : 0,
            take: req.query.limit ? +req.query.limit : 10
        }
        const [contact, number] = await contactRepository.findAndCount({
            where: {...params}, 
            skip: paginator.skip,
            take: paginator.take,
            order: {name: 'ASC'} 
        });
        const status = contact.length > 0 ? 200 : 204;
        res.status(status).send({total: number, contacts: contact});
    };

    static getProfile = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        const contactRepository = AppDataSource.getRepository(Contact);
        try {
            const contact = await contactRepository.findOneByOrFail({ id });
            res.status(200).send(contact);
        } catch (err) {
            res.status(404).send({errors: { notFound: ErrorType.NotFound}});
        }
    };

    static newContact = async (req: Request, res: Response) => {
        const contact = Object.assign(new Contact(), req.body);
        const validateErrors = await validate(contact);
        let errors: TypeResponseErrors<Contact> = {}; 
        errors.validators = await ErrorHelper.getValidatorErrors(validateErrors);
        if (Object.keys(errors.validators).length > 0) {
            res.status(400).send(errors);
            return;
        }
        const contactRepository = AppDataSource.getRepository(Contact);
        if (req.body.dni) {
            const exists = await contactRepository.findOne({ where: { dni: req.body.dni } });
            if (exists) {
                errors.exist = ErrorType.Exist;
                res.status(404).send({ errors: errors })
                return;
            }
        }
        try {
            await contactRepository.save(contact)
            ;
        } catch (e) {
            errors.sql = ErrorType.SQL
            res.status(409).send({ errors: errors });
            return;
        }
        res.status(201).send({success: "Contact created"});
    };

    static editContact = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const contactRepository = AppDataSource.getRepository(Contact);
        let contact: Contact;
        try {
            contact = await contactRepository.findOneByOrFail({ id });
        } catch (error) {
            res.status(404).send({ success: "Contact not found"});
            return;
        }

        if(req.body.dni !== contact.dni) {
            let exist = await contactRepository.findOneBy({dni: req.body.dni});
            if(exist){
                res.status(409).send({ error: {exist: "Dni already exists" }});
                return;
            }
        }

        Object.keys(req.body).forEach(key => {
            contact[key] = req.body[key];
        });
        const validateErrors = await validate(contact);
        let errors: TypeResponseErrors<Contact> = {};
        errors.validators = await ErrorHelper.getValidatorErrors(validateErrors);
        if (Object.keys(errors.validators).length > 0) {
            res.status(400).send(errors);
            return;
        }
        try {
            await contactRepository.save(contact);
        } catch (e) {
            res.status(409).send(e);
            return;
        }
        res.status(200).send({success:'Success updating contact!'});
    };

    static deleteContact = async (req: Request, res: Response) => {
        const contactRepository = AppDataSource.getRepository(Contact);
        try {
            const contact = await contactRepository.findOneByOrFail({id: +req.params.id });
            contactRepository.remove(contact);
        } catch (error) {
            res.status(404).send({ success: "Contact not found"});
            return;
        }
        res.status(200).send({ success: 'Successfuly delete contact!'});
    };
    
};

export default ContactController;
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
        const contacts = await contactRepository.find({
            where: {...params}, 
            skip: req.query.offset,
            take: req.query.limit,
            order: {name: 'ASC'} 
        });
        const status = contacts.length > 0 ? 200 : 204
        res.status(status).send(contacts);
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
        const exists = await contactRepository.findOne({where:{dni: req.body.dni}});
        if (exists) {
            errors.exist = ErrorType.Exist;
            res.status(404).send({errors: errors})
        }
        try {
            await contactRepository.save(contact);
        } catch (e) {
            errors.sql = ErrorType.SQL
            res.status(409).send({ errors: errors });
            return;
        }
        res.status(201).send("Contact created");
    };

    static editContact = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const contactRepository = AppDataSource.getRepository(Contact);
        let contact: Contact;
        try {
            contact = await contactRepository.findOneByOrFail({ id });
        } catch (error) {
            res.status(404).send("Contact not found");
            return;
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
        res.status(200).send('Success updating contact!');
    };

    static deleteContact = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const contactRepository = AppDataSource.getRepository(Contact);
        let contact: Contact;
        try {
            contact = await contactRepository.findOneByOrFail({ id });
        } catch (error) {
            res.status(404).send("Contact not found");
            return;
        }
        contactRepository.delete(id);
        res.status(200).send('Successfuly delete contact!');
    };

    static changeExpelled = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const expelled = req.body.expelled;
        const contactRepository = AppDataSource.getRepository(Contact);
        let contact: Contact;
        try {
            contact = await contactRepository.findOneByOrFail({id});
        } catch (error) {
            res.status(404).send("Contact not found");
            return;
        }
        let errors: TypeResponseErrors<Contact> = {};
        const validateErrors = await validate(contact);
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
        res.status(200).send('Successfuly change expelled to ' + expelled);
    }
};

export default ContactController;
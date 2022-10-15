import { Request, Response } from "express";
import { validate } from "class-validator";
import { Contact } from "./ContactEntity";
import { AppDataSource } from "../data-source";

class ContactController{

static listAll = async (req: Request, res: Response) => {
    console.log('yes', res)
  const contactRepository = AppDataSource.getRepository(Contact);
  const contacts = await contactRepository.find();
  res.send(contacts);
};

static getOneById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const contactRepository = AppDataSource.getRepository(Contact);
  try {
    const contact = await contactRepository.findOneBy({id});
    res.send(contact);
  } catch (error) {
    res.status(404).send("Contact not found");
  }
};

static newContact = async (req: Request, res: Response) => {
  let contact = new Contact();
  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  const errors = await validate(contact);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  const contactRepository = AppDataSource.getRepository(Contact);
  try {
    await contactRepository.save(contact);
  } catch (e) {
    res.status(409).send("contactname already in use");
    return;
  }
  res.status(201).send("Contact created");
};

static editContact = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const contactRepository = AppDataSource.getRepository(Contact);
  let contact;
  try {
    contact = await contactRepository.findOneBy({id});
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("Contact not found");
    return;
  }

  //Validate the new values on model
  contact.name = name;
  contact.email = email;
  const errors = await validate(contact);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Try to safe, if fails, that means contactname already in use
  try {
    await contactRepository.save(contact);
  } catch (e) {
    res.status(409).send("contactname already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

static deleteContact = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const contactRepository = AppDataSource.getRepository(Contact);
  let contact: Contact;
  try {
    contact = await contactRepository.findOneBy({id});
  } catch (error) {
    res.status(404).send("Contact not found");
    return;
  }
  contactRepository.delete(id);
  res.status(204).send();
};
};

export default ContactController;
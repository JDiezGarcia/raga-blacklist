import { Router } from "express";
import ContactController from "../contacts/ContactController";

const router = Router();

router.get("/", ContactController.searchContacts);
router.get("/:id([0-9]+)", ContactController.getProfile);
router.post("/", ContactController.newContact);
router.patch("/:id([0-9]+)", ContactController.editContact);
router.delete("/:id([0-9]+)", ContactController.deleteContact);
router.patch("/:id([0-9]+)/expelled", ContactController.changeExpelled);

export default router;
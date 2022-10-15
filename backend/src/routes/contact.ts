import { Router } from "express";
import ContactController from "../contacts/ContactController";

const router = Router();

router.get("/", ContactController.listAll);
router.get("/:id([0-9]+)", ContactController.getOneById);
router.post("/", ContactController.newContact);
router.patch("/:id([0-9]+)", ContactController.editContact);
router.delete("/:id([0-9]+)", ContactController.deleteContact);

export default router;
import { Router } from "express";
import DbController from "../db/DbController";

const router = Router();

router.post("/", DbController.uploadDb);
router.get("/", DbController.downloadDb);

export default router;
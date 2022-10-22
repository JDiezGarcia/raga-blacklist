import { Router } from "express";
import LogController from "../logs/LogController";

const router = Router();

router.get("/:id([0-9]+)", LogController.searchLogs);
router.post("/:id([0-9]+)", LogController.newLog);
router.delete("/:id([0-9]+)", LogController.deleteLog);

export default router;
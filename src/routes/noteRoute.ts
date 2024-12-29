import { Router } from "express";
import { createNote } from "../controller/noteController";
const router = Router();

router.post('/create', createNote);

export default router;
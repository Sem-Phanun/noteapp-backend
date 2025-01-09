import { Router } from "express";
import { createNote } from "../controller/noteController";
import { authMiddlware } from "../middleware/authMiddleware";
const router = Router();

router.post('/create/:id', authMiddlware,createNote);

export default router;
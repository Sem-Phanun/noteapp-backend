import { Router } from "express";
import {  loginHandler, registerHandler } from "../controller/userController";

const router = Router();

router.post('/signup', registerHandler);
router.post('/signin', loginHandler);

export default router;
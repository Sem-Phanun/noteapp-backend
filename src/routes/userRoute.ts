import { Router } from "express";
import {  loginHandler, registerHandler, getUser, updateUser, updateNameHandler  } from "../controller/userController";
import { authMiddlware } from '../middleware/authMiddleware'
const router = Router();

router.post('/signup', registerHandler);
router.post('/signin', loginHandler);
router.post('/logout', loginHandler);
router.get('/profile/:id', authMiddlware ,getUser)
router.put('/profile/:id', authMiddlware, updateUser)
router.put('/profile/:id', authMiddlware, updateNameHandler)
export default router;
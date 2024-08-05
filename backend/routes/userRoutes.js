import express from 'express';
import { login, myProfile, register } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user/me",isAuth ,myProfile);

export default router;
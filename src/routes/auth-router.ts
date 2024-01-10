import express, { Router } from 'express';
import { loginUser } from '../controllers/auth-controller';

const authRouter: Router = express.Router();

authRouter.post('/login', loginUser);

export default authRouter;

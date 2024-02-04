import express, { Router } from 'express';
import { getCurrentUser } from '../controllers/users.controller';

const usersRouter: Router = express.Router();

usersRouter.get('/current', getCurrentUser);

export default usersRouter;

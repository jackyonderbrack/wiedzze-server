import express, { Router } from 'express';
import { createAdminUser } from '../controllers/configuration-controller';

const configurationRouter: Router = express.Router();

configurationRouter.post('/configure', createAdminUser);

export default configurationRouter;

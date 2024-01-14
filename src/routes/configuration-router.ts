import express, { Router } from 'express';
import { createAdminUser } from '../controllers/configuration-controller';

const configurationRouter: Router = express.Router();

configurationRouter.post('/first-configuration', createAdminUser);

export default configurationRouter;

import express, { Router } from 'express';

const createAdminRouter: Router = express.Router();

createAdminRouter.post('/create-admin', createAdminRouter);

export default createAdminRouter;

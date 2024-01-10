import express from 'express';
import controller from '../controllers/template-controller';

const templateRouter = express.Router();

templateRouter.post('/create', controller.createTemplate);
templateRouter.get('/get/:templateId', controller.readTemplate);
templateRouter.get('/get/', controller.readAllTemplates);
templateRouter.patch('/update/:templateId', controller.updateTemplate);
templateRouter.delete('/delete/:templateId', controller.deleteTemplate);

export = templateRouter;

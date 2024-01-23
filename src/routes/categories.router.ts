import express, { Router } from 'express';
import { getCategories, createCategory, deleteCategory, getCategory, updateCategory } from '../controllers/categories.controller';

const categoriesRouter: Router = express.Router();

categoriesRouter.get('/get', getCategories);
categoriesRouter.get('/get/:id', getCategory);
categoriesRouter.post('/create', createCategory);
categoriesRouter.put('/update/:id', updateCategory);
categoriesRouter.delete('/delete/:id', deleteCategory);

export default categoriesRouter;

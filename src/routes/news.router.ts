import express, { Router } from 'express';
import { getAllNews, createNews, deleteNews, updateNews } from '../controllers/news.controller';

const newsRouter: Router = express.Router();

newsRouter.get('/get', getAllNews);
// newsRouter.get('/get/:id', getNews);
newsRouter.post('/create', createNews);
newsRouter.put('/update/:id', updateNews);
newsRouter.delete('/delete/:id', deleteNews);

export default newsRouter;

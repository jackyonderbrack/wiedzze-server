import { NextFunction, Request, Response } from 'express';
import newsModel from '../models/news.model';
import Logging from '../library/Logging';

export const createNews = async (req: Request, res: Response, _next: NextFunction) => {
    const newNews = new newsModel({
        newsCategory: req.body.newsCategory,
        newsTitle: req.body.newsTitle,
        newsDescription: req.body.newsDescription,
        newsContent: req.body.newsContent,
        newsImageUrl: req.body.newsImageUrl
    });
    await newNews.save();
    Logging.info(`Dodano news "${req.body.newsTitle}"`);
    return res.status(200).json({ message: 'Utworzono:', newNews });
};

export const getAllNews = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const news = await newsModel.find().populate('newsCategory');
        res.status(200).json(news);
    } catch (error) {
        Logging.error(error);
        next(error);
    }
};

export const updateNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newsId = req.params.id;
        const updatedNewsData = req.body;
        const updatedNews = await newsModel.findByIdAndUpdate(newsId, updatedNewsData, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: 'News nie znaleziony' });
        }
        Logging.info(`News "${updatedNews.newsTitle}" został zaktualizowany`);
        res.status(200).json({ message: 'Zaktualizowano news:', updatedNews });
    } catch (error) {
        Logging.error(error);
        next(error);
    }
};

export const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newsId = req.params.id;
        const deletedNews = await newsModel.findByIdAndDelete(newsId);
        if (!deletedNews) {
            return res.status(404).json({ message: 'News nie znaleziony' });
        }
        Logging.info(`News "${deletedNews.newsTitle}" został usunięty`);
        res.status(200).json({ message: 'Usunięto news:', deletedNews });
    } catch (error) {
        Logging.error(error);
        next(error);
    }
};

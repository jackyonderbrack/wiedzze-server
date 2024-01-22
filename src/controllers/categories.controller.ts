import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import categoryModel from '../models/category.model';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    const newCategory = new categoryModel({
        categoryName: req.body.categoryName
    });
    await newCategory.save();
    Logging.info(`Kategoria "${req.body.categoryName}" została stworzona`);
    return res.status(200).json({ message: 'Stworzono', newCategory });
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        Logging.error(error);
        next(error);
    }
};

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Kategoria nie znaleziona' });
        }
        res.status(200).json(category);
    } catch (error) {
        Logging.error(error);
        next(error);
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Kategoria nie znaleziona' });
        }
        Logging.info(`Kategoria "${deletedCategory.categoryName}" została usunięta`);
        res.status(200).json({ message: 'Usunięto', deletedCategory });
    } catch (error) {
        Logging.error(error);
        next(error);
    }
};

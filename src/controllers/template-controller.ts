import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Template from '../models/template-model';

// Create
const createTemplate = (req: Request, res: Response, next: NextFunction) => {
    const { something } = req.body;

    const template = new Template({
        _id: new mongoose.Types.ObjectId(),
        something
    });

    return template
        .save()
        .then((template) => res.status(201).json({ template }))
        .catch((err) => res.status(500).json({ err }));
};

// Read
const readTemplate = (req: Request, res: Response, next: NextFunction) => {
    const templateId = req.params.templateId;

    return Template.findById(templateId)
        .then((template) => (template ? res.status(200).json({ template }) : res.status(404).json({ message: 'Not Found' })))
        .catch((err) => res.status(500).json({ message: err }));
};

// Read All
const readAllTemplates = (req: Request, res: Response, next: NextFunction) => {
    return Template.find()
        .then((templates) => (templates ? res.status(200).json({ templates }) : res.status(404).json({ message: 'Not Found' })))
        .catch((err) => res.status(500).json({ message: err.message }));
};

// Update
const updateTemplate = (req: Request, res: Response, next: NextFunction) => {
    const templateId = req.params.templateId;
    const updateData = req.body;

    Template.findByIdAndUpdate(templateId, updateData, { new: true })
        .then((template) => {
            if (!template) {
                return res.status(404).json({ message: 'Template not found' });
            }
            res.status(200).json({ template });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
};

// Delete
const deleteTemplate = (req: Request, res: Response, next: NextFunction) => {
    const templateId = req.params.templateId;

    Template.findByIdAndDelete(templateId)
        .then((template) => {
            if (!template) {
                return res.status(404).json({ message: 'Template not found' });
            }
            res.status(200).json({ message: 'Template deleted successfully' });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
};

export default { createTemplate, readAllTemplates, deleteTemplate, updateTemplate, readTemplate };

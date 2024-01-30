import { NextFunction, Request, Response } from 'express';
import mediaModel from '../models/media.model';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Brak pliku do przesłania' });
    }

    // tworzymy i zapisujemy info o mediach w bazie
    const media = new mediaModel({
        fileName: req.file.filename,
        fileType: req.file.mimetype,
        filePath: req.file.path
    });

    try {
        const savedMedia = await media.save();
        res.status(201).json({ message: 'Plik pomyslnie przesłany', media: savedMedia });
    } catch (error) {
        return res.status(500).json({ message: 'Błąd na serwerze podczas przesyłania', error });
    }
};

export const getMedia = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mediaList = await mediaModel.find();
        res.status(200).json(mediaList);
    } catch (error) {
        return res.status(500).json({ message: 'Błąd na serwerze podczas pobierania listy mediów', error });
    }
};

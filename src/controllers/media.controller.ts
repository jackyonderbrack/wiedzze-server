import { NextFunction, Request, Response } from 'express';
import mediaModel from '../models/media.model';
import fs from 'fs';
import path from 'path';

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
        const updatedMediaList = mediaList.map((media) => {
            return {
                ...media.toObject(),
                filePath: `http://localhost:8080/${media.filePath}`
            };
        });
        res.status(200).json(updatedMediaList);
    } catch (error) {
        return res.status(500).json({ message: 'Błąd na serwerze podczas pobierania listy mediów', error });
    }
};

export const deleteMedia = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // znajdujemy media do usuniecia
        const media = await mediaModel.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media nie istnieje' });
        }

        // usuwamy plik z serwera
        const filePath = media.filePath;
        fs.unlink(path.join(__dirname, '..', filePath), async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Błąd podczas usuwania pliku', error: err });
            }
            // następnie usuwamy plik z bazy
            await mediaModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Media usunięte pomyślnie' });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Błąd na serwerze podczas usuwania mediów', error });
    }
};

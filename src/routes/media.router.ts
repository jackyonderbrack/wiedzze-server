import express, { Router } from 'express';
import multer from 'multer';
import { deleteMedia, getMedia, uploadFile } from '../controllers/media.controller';
import path from 'path';
import fs from 'fs';

const mediaRouter: Router = express.Router();

// Ścieżka do katalogu uploads względem bieżącego pliku
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

// Sprawdź, czy katalog uploads istnieje, jeśli nie - stwórz go
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Zapis plików w katalogu uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

mediaRouter.get('/get', getMedia);

mediaRouter.post('/upload', upload.single('file'), uploadFile);

mediaRouter.delete('/delete/:id', deleteMedia);

export default mediaRouter;

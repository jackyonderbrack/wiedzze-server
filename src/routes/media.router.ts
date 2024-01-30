import express, { Router } from 'express';
import multer from 'multer';
import { getMedia, uploadFile } from '../controllers/media.controller';
import fs from 'fs';

const mediaRouter: Router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // zapis plikow
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

mediaRouter.get('/get', getMedia);

mediaRouter.post('/upload', upload.single('file'), uploadFile);

export default mediaRouter;

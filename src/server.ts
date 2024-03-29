import { config } from './config/database.config';
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import Logging from './library/Logging';
import authRouter from './routes/auth.router';
import configurationRouter from './routes/configuration.router';
import categoriesRouter from './routes/categories.router';
import newsRouter from './routes/news.router';
import mediaRouter from './routes/media.router';
import path from 'path';
import usersRouter from './routes/users.router';
import dotenv from 'dotenv';

dotenv.config();
const router = express();

// Connect to mongodb
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to db');
        StartServer();
    })
    .catch((err) => {
        Logging.error('Unable to connect to db');
        Logging.error(err);
    });

// Only start the server if mongo connects
const StartServer = () => {
    router.use((req, res, next) => {
        //Log the request
        Logging.info(`Incomming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            //Log the response
            Logging.info(`Incomming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // Rules of API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // Routes
    router.use('/auth', authRouter);
    router.use('/start', configurationRouter);
    router.use('/users', usersRouter);
    router.use('/categories', categoriesRouter);
    router.use('/news', newsRouter);
    router.use('/media', mediaRouter);
    router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

    // Healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    // Error Handling
    router.use((req, res, next) => {
        const err = new Error('Not found');
        Logging.error(err);
        return res.status(404).json({ message: err.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};

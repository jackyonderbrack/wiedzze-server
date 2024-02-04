import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:cluster0${MONGO_PASSWORD}@cluster0.wghge2x.mongodb.net/`;

const _PORT = process.env.PORT || 7070;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: _PORT
    }
};

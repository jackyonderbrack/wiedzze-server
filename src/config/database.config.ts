import dotenv from 'dotenv';

dotenv.config();

// const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb://127.0.0.1:27017/wiedzze`;

const _PORT = 8080;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: _PORT
    }
};

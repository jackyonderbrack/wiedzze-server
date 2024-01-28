import dotenv from 'dotenv';

dotenv.config();

// const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://mikeprojektowanie:cluster0password@cluster0.wghge2x.mongodb.net/`;

const _PORT = 8080;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: _PORT
    }
};

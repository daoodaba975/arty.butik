import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/artybutik',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL-CLIENT_ID || 'sb',
    accessKeyId: process.env.accessKeyId || 'accessKeyid',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
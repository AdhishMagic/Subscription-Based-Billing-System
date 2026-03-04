const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,

    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/subbill',
    },

    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'default_access_secret',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
        accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
        refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
    },

    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },

    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
        max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
    },
};

module.exports = config;

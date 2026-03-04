const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('./index');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongo.uri);
        logger.info(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB error: ${err.message}`);
});

module.exports = connectDB;

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const config = require('./config');
const { connectDB } = require('./config/database');
const logger = require('./utils/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const apiRoutes = require('./routes/v1');

// ─── Express App ────────────────────────────────────────────────────────────
const app = express();

// ─── Security Middleware ────────────────────────────────────────────────────
app.use(helmet());

app.use(
    cors({
        origin: config.corsOrigin,
        credentials: true,
    })
);

// ─── Rate Limiting ──────────────────────────────────────────────────────────
const limiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use(limiter);

// ─── Body Parsers ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── HTTP Request Logging ───────────────────────────────────────────────────
const morganFormat = config.nodeEnv === 'production' ? 'combined' : 'dev';
app.use(
    morgan(morganFormat, {
        stream: { write: (message) => logger.http(message.trim()) },
    })
);

// ─── Health Check ───────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// ─── API Routes ─────────────────────────────────────────────────────────────
app.use('/api/v1', apiRoutes);

// ─── 404 Handler ────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ───────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────────────────────────
const start = async () => {
    try {
        await connectDB();
        app.listen(config.port, () => {
            logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();

module.exports = app;

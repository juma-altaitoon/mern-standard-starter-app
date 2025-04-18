import winston from 'winston';

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    const logger = winston.createLogger({
        level: 'error',
        transports: [
            new winston.transports.File({ filename: 'error.log' }),
        ],
    });
    
    logger.error('err.message', { timestamp: new Date().toISOString()})
        
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default { notFound, errorHandler}
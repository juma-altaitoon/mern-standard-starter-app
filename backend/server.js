import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import helmet from 'helmet';
import mongoose from 'mongoose';
import ratelimit from 'express-rate-limit';
import morgan from 'morgan';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [process.env.FRONTEND_URL];
const corsOptions = {
    // Allow requests from this origin/frontend
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // Allow Credentials such as (cookies/auth headers)
    credentials: true,
}
const limiter = ratelimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, // Limit of requests from each IP per windowMs
    message: "To many requests, please try again later."
})

// Use morgan middleware for logging requests to the server
if (process.env.NODE_ENV === 'development') {
    // Logs concise information for development
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    // Lpgs detailed information for production
    app.use(morgan('combined'));
}
app.use(express.json());
// app.use(express.urlencoded({ extended: true}))
app.use(helmet());
app.use(cookieParser());
app.use(cors(corsOptions));

// Mount Routes
app.use('/users', authRoutes, limiter);
app.use(notFound);
app.use(errorHandler);

// DB Connection 
connectDB();
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await mongoose.connection.close();
    process.exit(0);
});

// Server Connection
app.listen(PORT, console.log(`Server listening on Port: ${PORT}`));


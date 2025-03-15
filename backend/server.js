import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    // Allow requests from this origin/frontend
    origin: "http://localhost:5173",
    // Allow Credentials such as (cookies/auth headers)
    credentials: true,
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/users', authRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(PORT, console.log(`Server listening on Port: ${PORT}`));


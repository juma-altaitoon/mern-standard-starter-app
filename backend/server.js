import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/users', authRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(PORT, console.log(`Server listening on Port: ${PORT}`));


import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.connection.on('error', (error) => {
            console.log("MongoDB connection error", error)
        })
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Failed to connect to MongoDB. ", error)
        process.exit(1);
    }
}

// module.exports = connectDB;
import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    await mongoose.connect(MONGO_URI).then(() => {
        console.log("✅ Database Connected")
    }).catch((err) => {
        console.log("❌ Database Connection Failed", err)
    })
}
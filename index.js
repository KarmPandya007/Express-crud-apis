import express from "express";
import { connectDB } from "./config/db.js";
import personRouter from "./routes/personRouter.js";
import cors from "cors";
import dotenv from 'dotenv';
import { errorHandler } from "./middleware/errorHandler.js";
import { limiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();



app.use(cors({
    origin: "http://localhost:3000", // or "*" to allow all
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json()); //Global Middleware for parsing JSON data


await connectDB();

app.get('/', (req, res) => {
    res.send("API is running....");
})

app.use('/api/person', personRouter);

// Global Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port : http://localhost:${process.env.PORT}`);
})


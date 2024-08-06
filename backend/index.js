import express from 'express';
import dotenv from "dotenv";
import connectDB from './database/db.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());  // npm cookie cookies pass for profile

app.get("/", (req,res) => {
    res.send("welcom to nish server");
})

app.use("/uploads",express.static("uploads"));

// routes
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', adminRoutes);



const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
    connectDB();
})

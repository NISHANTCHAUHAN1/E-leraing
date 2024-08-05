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

// routes
import userRoutes from './routes/userRoutes.js';

app.use('/api', userRoutes);



const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
    connectDB();
})

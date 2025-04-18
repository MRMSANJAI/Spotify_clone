import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js'; 
import connectDB from './src/Config/mongodb.js';
import connectCloudinary from './src/Config/cloudinary.js';

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/song', songRouter);

app.get('/', (req, res) => res.send('API WORKING'));

app.listen(port, () => console.log(`Server started on ${port}`));

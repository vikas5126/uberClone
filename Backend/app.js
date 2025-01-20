import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectToDb from './db/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';
import mapRoutes from './routes/maps.routes.js';
import rideRoutes from './routes/ride.routes.js';

const __dirname = path.resolve();
console.log(__dirname);

dotenv.config();

const app = express();

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/map', mapRoutes);
app.use('/ride', rideRoutes);

// Serve static files from the Frontend/dist directory
app.use(express.static(path.join(__dirname, "./Frontend/dist")));

// Handle all other routes by serving the index.html file
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

export default app;
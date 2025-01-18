const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');   
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users', userRoutes)
app.use('/captains', captainRoutes);
app.use('/map', mapRoutes);
app.use('/ride', rideRoutes);

app.use(express)

module.exports = app;
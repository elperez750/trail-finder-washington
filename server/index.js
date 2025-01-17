const cors = require('cors');
const express = require('express');
require('dotenv').config();

const trailsRouter = require('./src/routes/trailsRoute');
const authRouter = require('./src/routes/authRoute');
const commentsRouter = require('./src/routes/commentsRoute');
const connectDB = require('./src/database');

const app = express();

// Database connection
connectDB();


//Cors setup\
const corsOptions ={
    origin:'https://trail-finder-washington-client.vercel.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


app.use(cors(corsOptions));


// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Hello, Express Server');
});

// API Routes
app.use('/api/trails', trailsRouter);
app.use('/api/auth', authRouter);
app.use('/api/comments', commentsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

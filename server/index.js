const cors = require('cors');
const express = require('express');
require('dotenv').config();

const trailsRouter = require('./routes/trailsRoute');
const authRouter = require('./routes/authRoute');
const commentsRouter = require('./routes/commentsRoute');
const connectDB = require('./database');

const app = express();

// Database connection
connectDB();

// CORS Middleware
app.use(cors({
    origin: 'https://trail-finder-washington-client.vercel.app', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow cookies or authentication headers
}));

// Manually set headers (if needed)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://trail-finder-washington-client.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

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

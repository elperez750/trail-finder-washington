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


//Cors setup
const allowedOrigins = [
    'http://localhost:5173', // For local development
    'https://trail-finder-washington-client-554bnl8xf-elperez750s-projects.vercel.app', // Current frontend
    'https://trail-finder-washington-client.vercel.app' // Production frontend
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
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

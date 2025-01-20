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
    'http://localhost:5173', // Local development
    'https://trail-finder-washington-client-554bnl8xf-elperez750s-projects.vercel.app', // Deployed frontend
    'https://trail-finder-washington-client.vercel.app',
    'https://trail-finder-washington-client-5lyaeutap-elperez750s-projects.vercel.app',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow request
        } else {
            console.error(`Blocked by CORS: ${origin}`); // Debug blocked origins
            callback(new Error('Not allowed by CORS')); // Block request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies/credentials
}));


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

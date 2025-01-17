const cors = require('cors');
const express = require('express');
require('dotenv').config();

const trailsRouter = require('./routes/trailsRoute');
const authRouter = require('./routes/authRoute');
const commentsRouter = require('./routes/commentsRoute');
const connectDB = require('./database');

const app = express();
connectDB();

// Apply CORS middleware
app.use(cors({
    origin: 'https://trail-finder-washington-client.vercel.app', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow cookies or authentication headers
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/trails', trailsRouter);
app.use('/api/auth', authRouter);
app.use('/api/comments', commentsRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Hello, Express Server');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

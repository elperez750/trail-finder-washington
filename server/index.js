const cors = require('cors');
require('dotenv').config();
const trailsRouter = require('./src/routes/trailsRoute');
const authRouter = require('./src/routes/authRoute');
const commentsRouter = require('./src/routes/commentsRoute');
const connectDB = require('./src/database');
const express = require('express');

// Initialize Express App
const app = express();
connectDB();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:8000', 'https://trail-finder-washington-server.vercel.app', 'https://trail-finder-washington-client.vercel.app'], // Add your frontend origins here
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
    credentials: true // Allow cookies or other credentials if needed
}));

// Root Route
app.get('/', (req, res) => {
    res.send('Hello, Express Server');
});

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use('/trails', trailsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/comments', commentsRouter);

// Export the app for serverless deployment
module.exports = app;

// Start the server locally if not in serverless mode
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
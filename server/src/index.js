const cors = require('cors');
require('dotenv').config();
const trailsRouter = require('./routes/trailsRoute');
const authRouter = require('./routes/authRoute');
const commentsRouter = require('./routes/commentsRoute');
const connectDB = require('./database');
const express = require('express');

// Initialize Express App
const app = express();
connectDB();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://trail-finder-washington-client.vercel.app/trails'], // Add your frontend origins here
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

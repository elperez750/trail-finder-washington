const cors = require('cors');
require('dotenv').config();
const trailsRouter = require('./routes/trailsRoute');
const authRouter = require('./routes/authRoute');
const connectDB = require('./database');
const express = require('express');

// Initialize Express App
const app = express();
connectDB();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Root Route
app.get('/', (req, res) => {
    res.send("Hello, TypeScript with Express");
});

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use('/trails', trailsRouter);
apiRouter.use('/auth', authRouter);

// Helper Function to Save to Database


// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = apiRouter;

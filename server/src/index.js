const cors = require('cors');
const dotenv = require('dotenv');
const trailsRouter = require('./routes/trailsRoute');
const authRouter = require('./routes/authRoute');
const connectDB = require('./database');
const express = require('express');
// Load environment variables
dotenv.config();


const app = express();
connectDB();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send("Hello, TypeScript with Express");
});

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use('/trails', trailsRouter);
apiRouter.use('/auth', authRouter);


apiRouter.get('/test', (req, res) => {
    res.json({ message: 'Hello from the backend' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = apiRouter;

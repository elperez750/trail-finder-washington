import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import trailsRouter from './routes/trailsRoute';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express");
});

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use('/trails', trailsRouter);

apiRouter.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the backend' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default apiRouter;

import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import trailsRouter from './routes/trailsRoute';

//Load environment variables
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

const apiRouter = express.Router();
app.use('/api', apiRouter);


apiRouter.use("trails", trailsRouter);


//Middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, typescript with express")
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default apiRouter;

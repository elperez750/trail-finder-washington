import { Router } from "express";
import { Request, Response } from "express";


const trailsRouter = Router();


trailsRouter.get('/trails', (req: Request, res: Response) => {
    res.send('Trails route')
})


export default trailsRouter;
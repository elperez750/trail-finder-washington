const { Router } = require('express');


const trailsRouter = Router();


trailsRouter.get('/trails', (req, res) => {
    res.send('Trails route')
})


module.exports = trailsRouter;
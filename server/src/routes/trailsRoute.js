const { Router } = require('express');
const Hike = require('../models/trailModel');
const { get } = require('http');


const trailsRouter = Router();


const getRandomTrail = async () => {
    try{
        const randomTrails = await Hike.aggregate([
            { $match: {imageUrl: {$exists: true, $ne:""}}},
            { $match: { length: { $exists: true, $ne: "" }}},
            
            { $sample: { size: 12 }  }]);
        console.log(randomTrails);
        return randomTrails;
    }
    catch(err){
        console.error('Error:', err);
        throw new Error('Error getting random trails');
    }

}



const getFilteredTrails = async (query) => {
    try{
        const filteredTrails = await Hike.find({name: query});
        return filteredTrails;
    }
    catch(err){
        console.error('Error:', err);
        throw new Error('Error getting filtered trails');
    }
}


trailsRouter.get('/random-trails', async (req, res) => {
    console.log('Route /random-trails hit'); // Debug log

    try{
        trails = await getRandomTrail();
        console.log(trails)
        res.status(200).json(trails);
    }
    catch(err){
        console.error('Error:', err);
        res.status(500).json({msg: 'Internal Server Error'});
    }
    
})


trailsRouter.get('/filtered-trails', async (req, res) => {  
    const filteredQuery = await getFilteredTrails(req.query);
    console.log(filteredQuery);
    res.status(200).json(filteredQuery);

})


module.exports = trailsRouter;
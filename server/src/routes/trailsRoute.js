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
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;

        const skip = (page-1) * limit


        const name = req.query.name;

        const filter = name? { name: {$regex: name, $options: 'i'}} : {};
        const filteredTrails = await Hike.find(filter).skip(skip).limit(limit);
        const totalTrails = await Hike.countDocuments(filter);
        res.status(200).json({trails: filteredTrails, totalPages : Math.ceil(totalTrails / limit), currentPage: page});
    }
    catch(err){
        console.error('Error:', err);
        res.status(500).json({msg: 'Internal Server Error'});
    }
   

})


module.exports = trailsRouter;
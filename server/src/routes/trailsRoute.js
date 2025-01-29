const { Router } = require('express');
const Hike = require('../models/trailModel');
const fetchTrailDetails = require('../getTrailDetails');

const trailsRouter = Router();

const getRandomTrail = async () => {
    try {
        const randomTrails = await Hike.aggregate([
            { $match: { imageUrl: { $exists: true, $ne: "" } } },
            { $match: { length: { $exists: true, $ne: "" } } },
            { $sample: { size: 12 } }
        ]);
        return randomTrails;
    } catch (err) {
        console.error('Error getting random trails:', err.stack);
        throw new Error('Error getting random trails');
    }
};

trailsRouter.get('/trail-by-id', async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Trail id is required' });

    try {
        const hike = await Hike.findById(id);
        if (!hike) return res.status(404).json({ error: 'Trail not found' });
        res.status(200).json(hike);
    } catch (err) {
        console.error('Error fetching trail by ID:', err.stack);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

trailsRouter.get('/individual-trail', async (req, res) => {
    const { link } = req.query;
    if (!link) return res.status(400).json({ error: 'Trail link is required' });

    try {
        const trail = await fetchTrailDetails(link);
        res.status(200).json(trail);
    } catch (err) {
        console.error('Error fetching individual trail:', err.stack);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

trailsRouter.get('/random-trails', async (req, res) => {
    try {
        const trails = await getRandomTrail();
        res.status(200).json(trails);
    } catch (err) {
        console.error('Error fetching random trails:', err.stack);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

trailsRouter.get('/filtered-trails', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const name = req.query.name;
        const length = req.query.length?.toLowerCase().trim();

        let filter = {};
        if (length === "short") {
            filter = name
                ? { name: { $regex: name, $options: 'i' }, convertedLength: { $lt: Number(5) } }
                : { convertedLength: { $lt: Number(5) } };
        } else if (length === "medium") {
            filter = name
                ? { name: { $regex: name, $options: 'i' }, convertedLength: { $gte: Number(5), $lt: Number(10) } }
                : { convertedLength: { $gte: Number(5), $lt: Number(10) } };
        } else if (length === "long") {
            filter = name
                ? { name: { $regex: name, $options: 'i' }, convertedLength: { $gte: Number(10) } }
                : { convertedLength: { $gte: Number(10) } };
        } else {
            filter = name ? { name: { $regex: name, $options: 'i' } } : {};
        }

        // ✅ Run both queries in parallel for better performance
        const [filteredTrails, totalTrails] = await Promise.all([
            Hike.find(filter).skip(skip).limit(limit),
            Hike.countDocuments(filter)
        ]);

        res.status(200).json({
            trails: filteredTrails,
            totalPages: Math.ceil(totalTrails / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching filtered trails:', err.stack);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

module.exports = trailsRouter;

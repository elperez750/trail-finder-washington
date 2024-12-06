const fetchTrailLinks = require('./getLinks');
const fetchTrailDetails = require('./getTrailDetails');
const mongoose = require('mongoose');

const Hike = require('./models/trailModel');

const scrapeTrails = async () => {
    const allTrailLinks = [];
  
    // Step 1: Scrape multiple pages of trail links
    for (let page = 1; page <= 137; page++) { // Adjust number of pages
        console.log(`Scraping page ${page} for trail links...`);
        const links = await fetchTrailLinks(page);
        allTrailLinks.push(...links);
    }
  
    console.log(`Found ${allTrailLinks.length} trail links.`);
  
    // Step 2: Scrape each trail page for details
    for (const link of allTrailLinks) {
        console.log(`Scraping details from ${link}...`);
        const details = await fetchTrailDetails(link);
        console.log(details.name)
        if (details) {
            // Save or update in the database based on the trail's name
            await Hike.updateOne(
                { name: details.name }, // Search by trail name
                { 
                    $set: {               // Update these fields
                        difficulty: details.difficulty,
                        latitude: details.latitude,
                        longitude: details.longitude,
                        description: details.description // Add more fields as necessary
                    }
                },
                { upsert: true }         // Insert if not found
            );
        }
    }
  
    console.log('Scraping complete.');
};


(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/trailsapp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
        await scrapeTrails();
    } catch (err) {
        console.error('Error:', err.message);
    }
})();



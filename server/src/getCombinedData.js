const fetchTrailLinks = require('./getLinks');
const fetchTrailDetails = require('./getTrailDetails');
const mongoose = require('mongoose');
const Hike = require('./models/trailModel');

const scrapeTrails = async () => {
    const allTrailLinks = [];

    // Step 1: Scrape multiple pages of trail links
    try {
        for (let offset = 0; offset <= 4110; offset += 30) { // Assuming 137 is the last page
           
            const links = await fetchTrailLinks(offset);
            
            if (links && links.length > 0) {
                allTrailLinks.push(...links);
            } else {
                console.log(`No links found on page ${offset}`);
                break; 
            }
        }

        console.log(`Found ${allTrailLinks.length} trail links.`);
    } catch (error) {
        console.error('Error fetching trail links:', error.message);
        return;
    }

    // Step 2: Scrape each trail page for details
    try {
        for (const link of allTrailLinks) {
            console.log(`Scraping details from ${link}...`);
            const details = await fetchTrailDetails(link);

            if (details && details.name) {
                console.log(`Processing trail: ${details.name}`);

                // Save or update in the database based on the trail's name
                await Hike.updateOne(
                    { name: details.name }, // Search by trail name
                    {
                        $set: { // Update these fields
                            difficulty: details.difficulty,
                            latitude: details.latitude,
                            longitude: details.longitude,
                            description: details.paragraphs,
                         
                        },
                    },
                    { upsert: true } // Insert if not found
                );
            } else {
                console.log(`Skipping trail with missing details: ${link}`);
            }
        }

        console.log('Scraping complete.');
    } catch (error) {
        console.error('Error fetching trail details:', error.message);
    }
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
        console.error('Database Error:', err.message);
    } finally {
        mongoose.disconnect(); // Ensure MongoDB connection is closed after the script finishes
        console.log('MongoDB Disconnected');
    }
})();

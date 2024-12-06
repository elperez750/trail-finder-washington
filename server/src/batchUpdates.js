const mongoose = require('mongoose');
const Hike = require('./models/trailModel'); // Adjust path if needed

const updateLengthsInBatches = async () => {
    const batchSize = 100;
    let skip = 0;

    try {
        console.log("Starting batch update process...");

        while (true) {
            const hikes = await Hike.find({ length: { $exists: true, $ne: "" } })
                .skip(skip)
                .limit(batchSize);

            if (hikes.length === 0) break;

            for (const hike of hikes) {
                const lengthString = hike.length;
                console.log(`Processing hike: ${hike.name}, length: ${lengthString}`);
                const numericLength = parseFloat(lengthString.split(" ")[0]);
                console.log(`Converted length: ${numericLength}`);
                await Hike.updateOne(
                    { _id: hike._id },
                    { $set: { convertedLength: numericLength } }
                );
            }

            skip += batchSize;
            console.log(`Processed ${skip} documents`);
        }

        console.log("Batch update process completed successfully!");
    } catch (error) {
        console.error("Error during batch update:", error);
    } finally {
        mongoose.disconnect();
    }
};

// Connect to the database and run the script
(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/trailsapp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
        await updateLengthsInBatches();
    } catch (err) {
        console.error('Error:', err.message);
    }
})();

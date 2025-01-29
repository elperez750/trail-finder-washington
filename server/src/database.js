const mongoose = require("mongoose");

const connectDB = async () => {


    const MONGO_URI = process.env.NODE_ENV === "production" ?
    process.env.MONGO_URI : process.env.MONGO_URI_LOCAL;

    console.log(MONGO_URI);
    try {
        console.log("🚀 Connecting to MongoDB...");
        console.log(MONGO_URI);
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });


        console.log("✅ Connected to Database:", mongoose.connection.name);

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};

module.exports = connectDB;

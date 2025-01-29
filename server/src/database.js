const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("🚀 Connecting to MongoDB...");
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};

module.exports = connectDB;

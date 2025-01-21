const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' }); // Specify the relative path to .env

const connectDB = async () => {
  if (isConnected) {
      console.log('Using existing database connection');
      return;
  }

  try {
      console.log('Connecting to MongoDB...');
      const conn = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 60000,
          socketTimeoutMS: 60000,
          maxPoolSize: 50,
      });
      isConnected = true;
      console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
      console.error(`[${new Date().toISOString()}] Error connecting to MongoDB:`, err.message);
      process.exit(1);
  }
};

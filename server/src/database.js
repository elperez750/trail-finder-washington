const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      await mongoose.connect('process.env.MONGO_URI', {
        useNewUrlParser: true, // Ensures proper connection parsing
            useUnifiedTopology: true, // Uses the latest server discovery and monitoring engine
            serverSelectionTimeoutMS: 60000, // Timeout after 60 seconds for server selection
            socketTimeoutMS: 60000, // Timeout after 60 seconds for socket inactivity
            maxPoolSize: 50, // Increases the number of concurrent database connections
      });
      console.log('MongoDB Connected');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Database Connection Error:', err.message);
      } else {
        console.error('Unexpected Error:', err);
      }
      process.exit(1); // Exit process if unable to connect
    }
  };
  

module.exports = connectDB;
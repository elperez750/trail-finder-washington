const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/trailsapp', {
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
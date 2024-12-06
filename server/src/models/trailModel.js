const { link } = require('fs');
const mongoose = require('mongoose');
const hikeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    elevation: { type: String },
    highestPoint: { type: String },
    imageUrl: { type: String },
    length: { type: String },
    link: { type: String },
    location: { type: String },
    convertedLength: { type: Number },
   
    
});

module.exports = mongoose.model('Hike', hikeSchema);

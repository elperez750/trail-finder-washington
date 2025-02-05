const mongoose = require('mongoose');


const traildetailsSchema = new mongoose.Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    difficulty: { type: String },
    latitude: { type: Number},
    longitude: { type: Number },
    pass: { type: String },
    passName: { type: String },
    passLink: { type: String },
    passDetails: { type: String },
    paragraphs: [{ type: String }],
   beforeYouGo: [{ text: String, href: String }],
    
}, {collection: "traildetails"});


module.exports = mongoose.model('Trail Details', traildetailsSchema);

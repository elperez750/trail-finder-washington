const mongoose = require('mongoose');
const commentsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    hikeId: { type: String, required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default:0 },
    dislikes: { type: Number, default: 0 },

}, {collection: "comments"});

module.exports = mongoose.model('Comment', commentsSchema);

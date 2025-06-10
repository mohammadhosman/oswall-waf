const mongoose = require('mongoose');

// ContactMessage model schema. This will be used to store contact messages sent by users through the contact form 
const ContactMessageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
const mongoose = require('mongoose');
const ProtectedSite = require('./ProtectedSite'); // Importing ProtectedSite model

// BlockedIP model schema. This will be used to store info about blocked IPs
const BlockedIPSchema = new mongoose.Schema({
    protectedSite: {type: mongoose.Schema.Types.ObjectId, ref: 'ProtectedSite', required: true},
    ip: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('BlockedIP', BlockedIPSchema);
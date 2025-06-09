const mongoose = require('mongoose');
const ProtectedSite = require('./ProtectedSite'); // Importing ProtectedSite model

// BlockedIP model schema. This will be used to store info about blocked IPs
const BlockedIPSchema = new mongoose.Schema({
    protectedSite: {type: mongoose.Schema.Types.ObjectId, ref: 'ProtectedSite', required: true},
    ip: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

BlockedIPSchema.index({ protectedSite: 1, ip: 1}, { unique: true });

module.exports = mongoose.model('BlockedIP', BlockedIPSchema);
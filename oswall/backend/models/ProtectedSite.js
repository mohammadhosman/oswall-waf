const mongoose = require('mongoose');

// ProtectedSite model schema. This will be used to store info about protected sites
// by users. For now, each user can have only one protected site.
const ProtectedSiteSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    siteName: {type: String, required: true, unique: true},
    siteUrl: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now},
    rateLimitMax: {type: Number, default: 10}, // Maximum requests per minute. Will probably change this
    rateLimitWindowMs: {type: Number, default: 60000}, // Time window for rate limiting in milliseconds
});

module.exports = mongoose.model('ProtectedSite', ProtectedSiteSchema);
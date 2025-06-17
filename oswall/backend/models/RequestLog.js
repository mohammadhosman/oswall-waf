const mongoose = require('mongoose');

// RequestLog model schema. This will be used to store info about requests made to the protected site
const RequestLogSchema = new mongoose.Schema({
    protectedSite: { type: mongoose.Schema.Types.ObjectId, ref: 'ProtectedSite', required: true },
    ip: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RequestLog', RequestLogSchema);
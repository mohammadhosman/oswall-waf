const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    protectedSite: { type: mongoose.Schema.Types.ObjectId, ref: 'ProtectedSite', required: true },
    ip: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', NotificationSchema);
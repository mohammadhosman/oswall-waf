const mongoose = require('mongoose');

const SecurityRuleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    windowUnit: {
        type: String,
        enum: ['second', 'minute', 'hour', 'day'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('SecurityRule', SecurityRuleSchema);
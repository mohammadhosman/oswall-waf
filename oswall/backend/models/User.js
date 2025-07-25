const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    // username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    address: {type: String},
    city: {type: String},
    country: {type: String}
})

module.exports = mongoose.model('User', UserSchema);
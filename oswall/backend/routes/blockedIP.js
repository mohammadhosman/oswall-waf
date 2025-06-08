const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const BlockedIP = require('../models/BlockedIP');
const ProtectedSite = require('../models/ProtectedSite');

// Get all blocked IPs for a user's protected site
router.get('/', auth, async (req, res) => {
    try {
        const protectedSite = await ProtectedSite.findOne({ user: req.user.id});
        if (!protectedSite) {
            console.error('Protected site not found for user. Sent from routes/blockedIP.js get method');
            return res.status(404).json({ message: 'Protected site not found' });
        }
        const blockedIPs = await BlockedIP.find({protectedSite: protectedSite._id});
        res.json(blockedIPs);
    } catch (error) {
        console.error('Error fetching blocked IPs. 500 error sent from routes.blockedIPs.js get method', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Add a new IP address to the blocked list of a user's protected site
router.post('/', auth, async (req, res) =>{
    const {ip} = req.body;
    if (!ip) {
        console.error('IP address is required. Sent from routes/blockedIP.js post method');
        return res.status(400).json({ message: 'IP address is required' });
    }
    try {
        const protectedSite = await ProtectedSite.findOne({ user: req.user.id });
        if (!protectedSite) {
            console.error('Protected site not found for user. Sent from routes/blockedIP.js post method');
            return res.status(404).json({ message: 'Protected site not found' });
        }
        const blockedIP = new BlockedIP({
            protectedSite: protectedSite._id,
            ip: ip
        });
        await blockedIP.save();
        res.status(201).json(blockedIP);
    } catch (error) {
        console.error('Error adding blocked IP. 500 error sent from routes/blockedIP.json post method', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a blocked IP address from a user's protected site
router.delete('/:id', auth, async (req, res) =>{
    try {
        const protectedSite = await ProtectedSite.findOne({ user: req.user.id });
        if (!protectedSite) {
            console.error('Protected site not found for user. Sent from routes/blockedIP.js delete method');
            return res.status(404).json({ message: 'Protected site not found' });
        }
        const deletedIP = await BlockedIP.findOneAndDelete({
            _id: req.params.id,
            protectedSite: protectedSite._id
        });
        if (!deletedIP) {
            console.error('Blocked IP not found. Sent from routes/blockedIP.js delete method');
            return res.status(404).json({ message: 'Blocked IP not found' });
        };
        res.json({ message: 'Blocked IP deleted successfully' });
    } catch (error) {
        console.error('Error deleting blocked IP. 500 error sent from routes/blockedIP.js delete method', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
/* Routes for managing blocked IPs in a user's protected site
This file contains the routes for getting, adding, and deleting blocked IPs
from a user's protected site. It uses the BlockedIP model to interact with the database. */
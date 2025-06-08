const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ProtectedSite = require('../models/ProtectedSite');

// Get a user's protected site
router.get('/', auth, async (req, res) =>{
    try {
        const protectedSite = await ProtectedSite.findOne({user: req.user.id});
        if (!protectedSite) {
            return res.status(404).json({message: 'Protected site not found'});
        }
        res.json(protectedSite);
    } catch (error){
        console.error('Error fetching protected site in routes/protectedSite router.get: ', error);
        res.status(500).json({message: 'Server error while fetching protected site'});
    }
});

// Add a new protected site
router.post('/', auth, async (req, res) =>{
    const {siteName, siteUrl} = req.body;
    if (!siteName || !siteUrl) {
        console.error('Site name or URL is missing in routes/protectedSites router.post: ', req.body);
        return res.status(400).json({message: 'Site name and URL are required'});
    }
    try {
        // Check if the user already has a protected site
        const existingSite = await ProtectedSite.findOne({user: req.user.id});
        if (existingSite){
            console.error('User already has a protected site. Error message sent from routes/protectedSites router.post: ', req.user.id);
            return res.status(400).json({message: 'You already have a protected site'});
        }
        const newProtectedSite = new ProtectedSite({
            user: req.user.id,
            siteName,
            siteUrl
        });
        await newProtectedSite.save();
        res.status(201).json({message: `Protected site created successfully for user ${req.user.id}`, protectedSite: newProtectedSite.siteName})
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            console.error('Duplicate key error in routes/protectedSites router.post: ', error);
            return res.status(400).json({message: 'Protected site with this name or URL already exists'});
        }
        console.error('Error creating protected site. Sent from routes/protectedSites router.post: ', error);
        res.status(500).json({message: 'Server error while creating protected site'});
    }
});

// Delete a user's protected site
router.delete('/', auth, async (req, res) => {
    try {
        const deletedSite = await ProtectedSite.findOneAndDelete({user: req.user.id});
        if (!deletedSite) {
            console.error('Protected site not found for deletion. Sent from routes/protectedSites router.delete: ', req.user.id);
            return res.status(404).json({message: 'Protected site not found'});
        }
        res.json({message: 'Protected site deleted successfully', siteName: deletedSite.siteName});
    } catch (error) {
        console.error('Error deleting protected site. Sent from routes/protectedSites router.delete: ', error);
        res.status(500).json({message: 'Server error while deleting protected site'});
    }
});

module.exports = router;
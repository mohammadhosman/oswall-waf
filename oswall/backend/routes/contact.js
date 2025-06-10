const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST route to handle contact form submissions
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        console.error('Name, email, and message are required. 40 error sent from routes/contact.js post method');
        return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    try {
        const contactMessage = new ContactMessage({
            name, 
            email,
            message
        })
        await contactMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving contact message. 500 error sent from routes/contact.js post method', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
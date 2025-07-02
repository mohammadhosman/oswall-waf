const express = require('express');
const router = express.Router();
const SecurityRule = require('../models/SecurityRule'); // Your Mongoose model
const auth = require('../middleware/auth'); // Your auth middleware

// GET all rules for the logged-in user
router.get('/', auth, async (req, res) => {
    const rules = await SecurityRule.find({ userId: req.user.id });
    res.json(rules);
});

// POST create a new rule
router.post('/', auth, async (req, res) => {
    console.log('POST /api/security-rules called');
    console.log('Authenticated user:', req.user);
    console.log('Request body:', req.body);
    const { limit, windowUnit } = req.body;
    // Prevent duplicate windowUnit per user
    const existing = await SecurityRule.findOne({ userId: req.user.id, windowUnit });
    if (existing) {
        console.log('Duplicate rule detected for user:', req.user.id, 'windowUnit:', windowUnit);
        return res.status(400).json({ message: 'A rule for this time unit already exists.' });
    }
    const rule = new SecurityRule({
        userId: req.user.id,
        limit,
        windowUnit
    });
    try {
        await rule.save();
        console.log('Rule saved:', rule);
        res.json(rule);
    } catch (err) {
        console.error('Error saving rule:', err);
        res.status(500).json({ message: 'Failed to save rule.' });
    }
});

// PUT update a rule
router.put('/:id', auth, async (req, res) => {
    const { limit, windowUnit } = req.body;
    // Prevent duplicate windowUnit per user (excluding the rule being updated)
    const duplicate = await SecurityRule.findOne({
        userId: req.user.id,
        windowUnit,
        _id: { $ne: req.params.id }
    });
    if (duplicate) {
        return res.status(400).json({ message: 'A rule for this time unit already exists.' });
    }
    const rule = await SecurityRule.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { limit, windowUnit },
        { new: true }
    );
    if (!rule) return res.status(404).json({ message: 'Rule not found' });
    res.json(rule);
});

// DELETE a rule
router.delete('/:id', auth, async (req, res) => {
    const rule = await SecurityRule.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!rule) return res.status(404).json({ message: 'Rule not found' });
    res.json({ success: true });
});

module.exports = router;
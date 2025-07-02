const express = require('express');
const router = express.Router();
const ProtectedSite = require('../models/ProtectedSite');
const RequestLog = require('../models/RequestLog');
const BlockedIP = require('../models/BlockedIP');
const isIPBlocked = require('../utils/isIPBlocked');
const Notification = require('../models/Notification'); // Assuming you have a Notification model
const User = require('../models/User'); // Assuming you have a User model
const sendEmail = require('../utils/sendEmail'); // Assuming you have a utility function to send emails
const SecurityRule = require('../models/SecurityRule'); // Add this import

router.post('/', async (req, res) => {
    const { siteId } = req.body;
    const ip = req.ip;

    try {
        const protectedSite = await ProtectedSite.findById(siteId);
        if (!protectedSite) {
            return res.status(404).json({ message: 'Site not found' });
        }

        if (await isIPBlocked(protectedSite._id, ip)) {
            return res.status(403).json({ message: 'IP blocked' });
        }

        await RequestLog.create({
            protectedSite: protectedSite._id,
            ip: ip
        });

        // Get all custom security rules for this user/site
        const rules = await SecurityRule.find({ userId: protectedSite.user });
        if (!rules.length) {
            // No custom rule set, allow all requests
            return res.status(200).json({ message: 'Visit logged (no security rule set)' });
        }
        // Check all rules
        const unitToMs = { second: 1000, minute: 60000, hour: 3600000, day: 86400000 };
        for (const rule of rules) {
            const windowMs = unitToMs[rule.windowUnit];
            const limit = rule.limit;
            if (!windowMs || !limit) continue; // skip invalid rules
            const windowStart = new Date(Date.now() - windowMs);
            const recentCount = await RequestLog.countDocuments({
                protectedSite: protectedSite._id,
                ip: ip,
                timestamp: { $gte: windowStart }
            });
            if (recentCount >= limit) {
                // Send email notification to the user
                try {
                    const user = await User.findById(protectedSite.user);
                    if (user && user.email) {
                        await sendEmail(
                            user.email,
                            'OsWall Alert: Rate Limit Exceeded',
                            `IP ${ip} has exceeded the custom security rule (${limit} requests per ${rule.windowUnit}) for your site "${protectedSite.siteName}".`
                        );
                    }
                } catch (emailErr) {
                    console.error('Failed to send rate limit email notification:', emailErr);
                }
                return res.status(429).json({ message: 'Rate limit exceeded' });
            }
        }
        res.status(200).json({ message: 'Visit logged' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
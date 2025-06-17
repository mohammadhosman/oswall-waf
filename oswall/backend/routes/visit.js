const express = require('express');
const router = express.Router();
const ProtectedSite = require('../models/ProtectedSite');
const RequestLog = require('../models/RequestLog');
const BlockedIP = require('../models/BlockedIP');
const isIPBlocked = require('../utils/isIPBlocked');
const Notification = require('../models/Notification'); // Assuming you have a Notification model
const User = require('../models/User'); // Assuming you have a User model
const sendEmail = require('../utils/sendEmail'); // Assuming you have a utility function to send emails

// RATE_LIMIT and WINDOW_MINUTES are used to limit the number of requests from an IP address
// to a protected site within a specified time window.
// I will use these hardcoded values for now
const RATE_LIMIT = 10; // requests
const WINDOW_MINUTES = 60; // time window in minutes

router.post('/', async (req, res) => {
    const { siteId } = req.body;
    const ip = req.ip;

    try {
        const protectedSite = await ProtectedSite.findById(siteId);
        if (!protectedSite) {
            console.error('Protected site not found for ID. Sent from routes/visit POST method: ', siteId);
            return res.status(404).json({ message: 'Site not found' });
        }

        if (await isIPBlocked(protectedSite._id, ip)) {
            console.error('IP blocked for site. 403 error sent from routes/visit POST method: ', ip);
            return res.status(403).json({ message: 'IP blocked' });
        }

        await RequestLog.create({
            protectedSite: protectedSite._id,
            ip: ip
        });

        // Rate-limit detection
        const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);
        const recentCount = await RequestLog.countDocuments({
            protectedSite: protectedSite._id,
            ip: ip,
            timestamp: { $gte: windowStart }
        });

        if (recentCount > RATE_LIMIT) {
            // Check for existing unread notification
            const existing = await Notification.findOne({
                protectedSite: protectedSite._id,
                ip: ip,
                read: false,
                message: { $regex: 'rate limit', $options: 'i' }
            });
            if (!existing) {
                await Notification.create({
                    protectedSite: protectedSite._id,
                    ip: ip,
                    message: `Rate limit exceeded: ${recentCount} requests in the last ${WINDOW_MINUTES} minutes.`,
                });

                const user = await User.findById(protectedSite.user);
                if (user && user.email) {
                    console.log('About to send email from routes/visit.js');
                    await sendEmail(
                        user.email,
                        'OsWall Alert: Rate Limit Exceeded',
                        `IP ${ip} has made ${recentCount} requests to your site "${protectedSite.domain}" in the last ${WINDOW_MINUTES} minutes.`
                    );
                    console.log('Email sent successfully from routes/visit.js');
                }
            }
            console.warn(`Rate limit exceeded for IP ${ip} on site ${protectedSite._id}`);
        }

        console.log('Visitor IP:', ip, 'req.ip:', req.ip, 'x-forwarded-for:', req.headers['x-forwarded-for']);
        res.status(200).json({ message: 'Visit logged' });
    } catch (err) {
        console.error('Error logging visit:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
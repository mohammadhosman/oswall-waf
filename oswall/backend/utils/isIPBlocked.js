const BlockedIP = require('../models/BlockedIP');

// Heper function to check if an IP is blocked for a specific protected site
async function isIPBlocked(protectedSiteId, ip) {
    const blocked = await BlockedIP.findOne({
        protectedSite: protectedSiteId,
        ip: ip
    });
    return !!blocked;
}

module.exports = isIPBlocked;
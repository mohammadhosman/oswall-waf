const RequestLog = require('../models/RequestLog');
const ProtectedSite = require('../models/ProtectedSite');

module.exports = async function logRequest(req, res, next) {
    try {
        // Find the protected site for the current user
        const protectedSite = await ProtectedSite.findOne({ user: req.user.id });
        if (protectedSite) {
            await RequestLog.create({
                protectedSite: protectedSite._id,
                ip: req.ip 
            });
        }
    } catch (err) {
        console.error('Error logging request:', err);
        // Don't block the request if logging fails
    }
    next();
};
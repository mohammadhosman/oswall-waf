const express = require('express');
const rateLimit = require('express-rate-limit');
const {createProxyMiddleware} = require('http-proxy-middleware');
const ProtectedSite = require('../models/ProtectedSite');
const router = express.Router();

// Cache for rate limiters per site
const limiterCache = {};

// Rate limiting middleware
async function rateLimiter(req, res, next) {
    const siteId = req.params.siteId;
    const site = await ProtectedSite.findById(siteId);
    if (!site) {
        console.error('Protected site not found for rate limiting. Sent from routes/proxy.js rateLimiter function');
        return res.status(404).json({ message: 'Protected site not found' });
    }
    // Use a cached limiter if available, els create one
    if (!limiterCache[siteId]) {
        limiterCache[siteId] = rateLimit ({
        windowMs: site.rateLimitWindowMs, // Time frame in milliseconds
        max: site.rateLimitMax, // Max requests per windowMs
        keyGenerator: (req, res) => `${siteId}_${req.ip}`,
        handler: (req, res) => {
            console.error('Rate limit exceeded for site. Sent from routes/proxy.js rateLimiter function')
            res.status(429).json({
                message: 'Rate limit exceeded. Please try again later.'
            });
        }
        });
    }
    limiterCache[siteId](req, res, next);
}

// Proxy middleware to forward requests to the protected site
router.use('/:siteId', rateLimiter, async (req, res, next) =>{
    const site = await ProtectedSite.findById(req.params.siteId);
    if (!site){
        console.error('Protected site not found for proxy. 404 error sent from routes/proxy.js use method');
        return res.status(404).json({ message: 'Protected site not found' });
    }

    // Get the proxy path from the request parameters
    //const proxyPath = req.url === '/' ? '' : req.url;
    let proxyPath
    if (req.url === '/' || req.url === '') {
        proxyPath = '';
    } else if (req.url.startsWith('/')) {
        proxyPath = req.url;
    } else {
        proxyPath = '/' + req.url;
    }

    // Creating a proxy middleware to forward requests
    createProxyMiddleware({
        target: site.siteUrl,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            /* If a proxy path is provided, use it; otherwise, default to the root path
            This allows the proxy to forward requests to the correct path on the target site */

            if (proxyPath) {
                if (proxyPath.startsWith('/')) {
                    return proxyPath;
                } else {
                    return '/' + proxyPath;
                }
            }
            // If no proxy path is provided, just return the root path
            console.error('No proxy path provided. Returning root path. Sent from routes/proxy.js use method');
            return '/';
        },
    })(req, res, next);
});

module.exports = router;
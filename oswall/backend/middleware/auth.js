const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({message: 'No token, authorization denied. from middleware/auth.js auth function'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId ? {id: decoded.userId} : decoded;
        next();
    } catch (error) {
        console.error('Token verification failed. From middleware/auth.js auth function catch block: ', error);
        res.status(401).json({message: 'Token is not valid.'})
    }
}

module.exports = auth;
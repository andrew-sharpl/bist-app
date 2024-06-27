const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    // check if no token
    if (!token) {
        return res.status(401).json({msg: 'Token not found, authorization failed'});
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        if (decoded.user) req.user = decoded.user;
        if (decoded.admin) req.admin = decoded.admin;
        next();
    }
    catch(err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}
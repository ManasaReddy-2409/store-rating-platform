const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded; // Add user info to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden. You do not have the required role.' });
    }
    next();
};

module.exports = { protect, authorize };
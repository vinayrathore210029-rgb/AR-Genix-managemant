"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};
exports.authenticate = authenticate;
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            return;
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;

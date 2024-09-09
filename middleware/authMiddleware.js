const jwt = require('jsonwebtoken');
const JWT_SECRET = "CheenTapakDamDam";

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication header missing or invalid!' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Token missing!' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return res.status(200).json({ user: req.user });
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token!' });
    }
};


module.exports = authMiddleware;

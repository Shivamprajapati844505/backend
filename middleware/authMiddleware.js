const jwt = require('jsonwebtoken');
const JWT_SECRET = "CheenTapakDamDam";

const authMiddleware = (req, res, next) => {
    // Extract the token from the 'cookie' header
    const cookieHeader = req.headers.cookie;
    
    if (!cookieHeader) {
        return res.status(401).json({ error: 'Authentication cookie missing!' });
    }

    // Parse the cookie to extract the token
    const token = cookieHeader
        .split(';')
        .find(cookie => cookie.trim().startsWith('token='))
        ?.split('=')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token missing in cookie!' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token!' });
    }
};

module.exports = authMiddleware;

const roleMiddleware = (requiredRole) => (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
        console.log("here", req.user, req.user.role);
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = roleMiddleware;
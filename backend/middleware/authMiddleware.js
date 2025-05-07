const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    // Get token from Authorization header: "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //token contains this payload: { id: user._id } — meaning the user’s database ID is stored inside the token.
        //Later, in protected routes, token is decoded:

        // Attach user to request (excluding password)
        req.user = await User.findById(decoded.id).select('-password');
        // Now req.user can be accessed by anyone who has used this mware before controller

        next(); // continue to next middleware or route
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

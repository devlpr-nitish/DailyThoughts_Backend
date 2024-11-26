import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Token is passed in Authorization header as "Bearer <token>"
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied, no token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

    next();
};
export default authenticate;

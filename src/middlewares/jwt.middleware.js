import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const token = req.header('Authorization') // Token is passed in Authorization header as "Bearer <token>"
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied, unauthorized user"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.userId = decoded.userId; // Attach user data to the request object
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

    next();
};
export default authenticate;

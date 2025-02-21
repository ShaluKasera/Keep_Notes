import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log("Auth Header:", authHeader); // 🔍 Check the header

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log("Extracted Token:", token); // 🔍 Check the token

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (error) {
        console.error("Token Error:", error.message); // 🔍 Error details
        res.status(401).json({ message: 'Invalid token. Authorization denied.' });
    }
};

export default authMiddleware;


import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ msg: `Invalid or expired token error : ${err}` });
  }
};

export default authMiddleware;

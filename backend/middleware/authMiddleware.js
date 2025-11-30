const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id || decoded._id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

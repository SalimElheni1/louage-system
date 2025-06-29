import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT token
const auth = (req, res, next) => {
  // Get token from HTTP-only cookie
  const token = req.cookies && req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user to request object
    req.user = decoded;
    
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default auth;
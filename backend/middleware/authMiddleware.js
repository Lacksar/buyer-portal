import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Token from '../models/Token.js';

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const activeToken = await Token.findOne({ token });
    if (!activeToken) {
      return res.status(401).json({ message: 'Session expired or logged out. Please log in again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default protect;

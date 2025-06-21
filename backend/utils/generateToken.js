import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    // maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    maxAge: 60 * 60 * 1000 * 24 * 30, // 1 month
  });
}

export default generateToken;
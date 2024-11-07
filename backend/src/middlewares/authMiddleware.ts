import { NextFunction, Response, Request } from 'express';
import { UserData } from '../types/types';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  req.session = { user: null };

  try {
    const data = jwt.verify(token, JWT_SECRET) as UserData;
    req.session.user = data;

    next();
  } catch {
    return res.status(401).json({ mensaje: 'Invalid or expired token' });
  }
}

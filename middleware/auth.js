import jwt from 'jsonwebtoken';
import { findUserById } from '../models/userModel.js';
import 'dotenv/config.js';

export default async function auth(req, res, next) {
  const header = req.headers.authorization; // "Bearer token"
  if (!header) return res.status(401).json({ message: 'Missing token' });

  const token = header.split(' ')[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(id);
    if (!user) throw new Error();
    req.user = user; // attach user to request
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

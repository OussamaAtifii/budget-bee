import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { JWT_SECRET } from '../config/config';
import User from '../models/User';
import { userLoginSchema } from '../schemas/UserSchema';
import UserService from '../services/UserService';
import { AppError } from '../errors/AppError';

class UserController {
  static async register(req: Request, res: Response) {
    const userData = req.body;

    try {
      const { user, token } = await UserService.registerUser(userData);

      res
        .status(201)
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          maxAge: 3600000,
        })
        .json({
          message: 'User created successfully',
          email: user.email,
        });
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      return res
        .status(500)
        .json({ error: 'Internal server error while registering user' });
    }
  }

  static async login(req: Request, res: Response) {
    const userData = req.body;

    try {
      const { user, token } = await UserService.loginUser(userData);

      return res
        .status(200)
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 3600000,
        })
        .json({
          message: 'User logged in successfully',
          email: user.email,
        });
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      return res
        .status(500)
        .json({ error: 'Internal server error while logging in' });
    }
  }

  static async logout(_req: Request, res: Response) {
    try {
      return res
        .status(200)
        .cookie('token', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 0,
        })
        .json({ message: 'User logged out successfully' });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Internal server error while logging out' });
    }
  }
}

export default UserController;

import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  // Register a new user
  static async register(req: Request, res: Response, next: NextFunction) {
    const userData = req.body;

    try {
      // Get user data and token
      const { user, token } = await UserService.registerUser(userData);

      // Send cookie with token
      res
        .status(201)
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 3600000,
        })
        .json({
          message: 'User created successfully',
          email: user.email,
        });
    } catch (error) {
      next(error);
    }
  }

  // Login an existing user
  static async login(req: Request, res: Response, next: NextFunction) {
    const userData = req.body;

    try {
      // Get user data and token
      const { user, token } = await UserService.loginUser(userData);

      // Send cookie with token
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
      next(error);
    }
  }

  // Logout a user
  static async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      // Send empty cookie
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
      next(error);
    }
  }
}

export default UserController;

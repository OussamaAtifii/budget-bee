import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  }

  static async logout(_req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  }
}

export default UserController;

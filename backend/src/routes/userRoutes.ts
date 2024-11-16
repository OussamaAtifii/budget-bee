import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

// Register a new user
userRouter.post('/register', UserController.register);

// Login an existing user
userRouter.post('/login', UserController.login);

// Logout a user
userRouter.post('/logout', UserController.logout);

export default userRouter;

import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);

export default userRouter;

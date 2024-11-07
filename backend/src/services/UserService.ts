import User from '../models/User';
import { userLoginSchema, userSchema } from '../schemas/UserSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config/config';
import { ConflictError, UnauthorizedError } from '../errors/AppError';
import { InsertUser } from '../db/schema';

class UserService {
  static async registerUser(userData: InsertUser) {
    try {
      const validatedUserData = userSchema.parse(userData);
      const existingUser = await User.getUserByEmail(validatedUserData.email);

      if (existingUser) {
        throw new ConflictError('User already exists');
      }

      const saltRounds = 10;
      const hassedPassword = await bcrypt.hash(
        validatedUserData.password,
        saltRounds
      );

      validatedUserData.password = hassedPassword;

      const user = await User.createUser(validatedUserData);

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(userData: InsertUser) {
    const { password } = userData;

    try {
      const validatedUser = userLoginSchema.parse(userData);
      const userExist = await User.getUserByEmail(validatedUser.email);

      const passwordCorrect =
        userExist === null || userExist === undefined
          ? false
          : await bcrypt.compare(password, userExist.password);

      if (!(userExist && passwordCorrect)) {
        throw new UnauthorizedError('Invalid user or password');
      }

      const token = jwt.sign(
        { id: userExist.id, email: userExist.email },
        JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );

      return { user: userExist, token };
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

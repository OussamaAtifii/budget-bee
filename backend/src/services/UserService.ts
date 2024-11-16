import User from '../models/User';
import { userLoginSchema, userSchema } from '../schemas/UserSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config/config';
import { ConflictError, UnauthorizedError } from '../errors/AppError';
import { InsertUser } from '../db/schema';

class UserService {
  // Register a new user
  static async registerUser(userData: InsertUser) {
    try {
      // Validate user data
      const validatedUserData = userSchema.parse(userData);
      const existingUser = await User.getUserByEmail(validatedUserData.email);

      // Check if user already exists
      if (existingUser) {
        throw new ConflictError('User already exists');
      }

      // Hash password
      const saltRounds = 10;
      const hassedPassword = await bcrypt.hash(
        validatedUserData.password,
        saltRounds
      );

      // Replace password with hashed password
      validatedUserData.password = hassedPassword;

      // Create user and generate token
      const user = await User.createUser(validatedUserData);
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      // Return user and token
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  // Login an existing user
  static async loginUser(userData: InsertUser) {
    const { password } = userData;

    try {
      // Validate user data and check if user exists
      const validatedUser = userLoginSchema.parse(userData);
      const userExist = await User.getUserByEmail(validatedUser.email);

      // Check if user exists and password is correct
      const passwordCorrect =
        userExist === null || userExist === undefined
          ? false
          : await bcrypt.compare(password, userExist.password);

      if (!(userExist && passwordCorrect)) {
        throw new UnauthorizedError('Invalid user or password');
      }

      // Generate token
      const token = jwt.sign(
        { id: userExist.id, email: userExist.email },
        JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );

      // Return user and token
      return { user: userExist, token };
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

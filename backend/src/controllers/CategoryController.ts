import { NextFunction, Request, Response } from 'express';
import Category from '../models/Category';

class CategoryController {
  static async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categories = await Category.getAllCategories();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;

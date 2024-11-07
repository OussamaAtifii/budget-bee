import { Request, Response } from 'express';
import Category from '../models/Category';

class CategoryController {
  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await Category.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal server error while fetching categories data',
      });
    }
  }
}

export default CategoryController;

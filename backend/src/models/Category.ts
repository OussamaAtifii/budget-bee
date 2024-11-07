import { db } from '../db';
import { categories } from '../db/schema';

class Category {
  static async getAllCategories() {
    const allCategories = await db.select().from(categories);
    return allCategories;
  }
}

export default Category;

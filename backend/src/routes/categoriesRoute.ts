import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const categoriesRouter = Router();

// Get all categories
categoriesRouter.get('/', CategoryController.getAllCategories);

export default categoriesRouter;

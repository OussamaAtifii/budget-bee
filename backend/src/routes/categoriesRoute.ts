import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const categoriesRouter = Router();

categoriesRouter.get('/', CategoryController.getAllCategories);

export default categoriesRouter;

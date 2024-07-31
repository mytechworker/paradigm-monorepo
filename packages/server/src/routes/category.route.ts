import { Router } from 'express';

import { deserializeUser, allowedRoles } from '../middlewares/authHelpers';
import { uploadSingleImage } from '../middlewares/uploadSingleImage';

import { Category } from '../controllers';

const CategoryController = new Category();

const categoryRoutes = Router();

categoryRoutes.route('/all').get(CategoryController.getAllCategories);

categoryRoutes
    .route('/')
    .post(
        deserializeUser,
        allowedRoles(['admin']),
        uploadSingleImage('image'),
        CategoryController.createCategoryHandler
    )
    .get(CategoryController.getCategories);

categoryRoutes
    .route('/:id')
    .get(CategoryController.getCategory)
    .put(
        deserializeUser,
        allowedRoles(['admin']),
        uploadSingleImage('image'),
        CategoryController.updateCategoryHandler
    )
    .delete(
        deserializeUser,
        allowedRoles(['admin']),
        CategoryController.deleteCategoryHandler
    );

export default categoryRoutes;

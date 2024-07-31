import { Request, Response, NextFunction, Handler } from 'express';
import { DocumentType } from '@typegoose/typegoose';

import { Category } from '../db/schema/categories.schema';

import { CategoryService } from '../services';

import { CreateCategory, UpdateCategory } from '../types/category.types';
import { GenericResponse, PaginationQuery } from '../types/default.types';

import ErrorHandler from '../utils/errorHandler';

// instance
const categoryService = new CategoryService();

class CategoryController {
    createCategoryHandler: Handler = async (
        req: Request<{}, {}, CreateCategory>,
        res: Response<GenericResponse<DocumentType<Category>>>,
        next
    ) => {
        try {
            if (!req.file) {
                throw new ErrorHandler(
                    404,
                    'category image field is required!'
                );
            }

            const lastIndex = await categoryService.getCategory(
                {},
                {
                    sort: { index: -1 },
                    new: true,
                }
            );

            const data = {
                title: req.body.title,
                image: req.body.image,
                index: !lastIndex ? 0 : lastIndex!.index + 1,
            } as CreateCategory;

            const Category = await categoryService.createCategory(data);

            await Category.save();

            return res.status(201).json({
                success: true,
                message: 'category created',
                data: Category,
            });
        } catch (error) {
            next(error);
        }
    };

    updateCategoryHandler = async (
        req: Request<{ id: string }, {}, UpdateCategory>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = {
                title: req.body.title,
                image: req.body.image,
            };

            const Category = await categoryService.updateCategory(
                req.params.id,
                data,
                {
                    new: true,
                }
            );

            if (!Category) {
                throw new ErrorHandler(400, 'category not found!');
            }

            return res.status(200).json({
                success: true,
                message: 'updated category',
                data: Category,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteCategoryHandler = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const Category = await categoryService.deleteCategory(
                req.params.id
            );

            if (!Category) {
                throw new ErrorHandler(400, 'category not found!');
            }

            return res.status(200).json({
                success: true,
                message: 'category removed.',
            });
        } catch (error) {
            next(error);
        }
    };

    getCategory = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response<GenericResponse<Category>>,
        next: NextFunction
    ) => {
        try {
            const Category = await categoryService.getCategoryById(
                req.params.id
            );

            if (!Category) {
                throw new ErrorHandler(404, 'category not found');
            }

            return res.status(200).json({
                success: true,
                message: 'category found',
                data: Category,
            });
        } catch (error) {
            next(error);
        }
    };

    getCategories = async (
        req: Request<{}, {}, {}, PaginationQuery>,
        res: Response<GenericResponse<any> & { total: number }>,
        next: NextFunction
    ) => {
        try {
            const page = req.query.page!;
            const limit = req.query.limit!;
            const total = await categoryService.countRecords();
            const Categories = await categoryService.getCategories(page, limit);

            return res.status(200).json({
                success: true,
                message: `total records fetched ${total}`,
                data: Categories,
                total,
            });
        } catch (error) {
            next(error);
        }
    };

    getAllCategories = async (
        req: Request<{}, {}, {}>,
        res: Response<GenericResponse<any> & { total: number }>,
        next: NextFunction
    ) => {
        try {
            const total = await categoryService.countRecords();
            const Categories = await categoryService.getAllCategories();

            return res.status(200).json({
                success: true,
                message: `total records fetched ${total}`,
                data: Categories,
                total,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default CategoryController;

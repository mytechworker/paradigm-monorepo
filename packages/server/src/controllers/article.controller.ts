import { Request, Response, NextFunction } from 'express';

import { Article } from '../db/schema/articles.schema';

import { ArticleService } from '../services';

import { CreateArticle, UpdateArticle } from '../types/article.types';
import { GenericResponse, PaginationQuery } from '../types/default.types';

import ErrorHandler from '../utils/errorHandler';

const articleService = new ArticleService();

class ArticleController {
    createArticleHandler = async (
        req: Request<{}, {}, CreateArticle>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = {
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                content: req.body.content,
                company: req.body.company,
                categories: req.body.categories,
                authorName: req.body.authorName,
                authorImage: req.body.authorImage,
                readtime: req.body.readtime,
                status: req.body.status,
                tags: req.body.tags,
                dateOfPublish: req.body.dateOfPublish,
            } as Partial<Article>;

            const Article = await articleService.createArticle(data);

            return res.status(201).json({
                success: true,
                message: 'article created',
                data: Article,
            });
        } catch (error) {
            next(error);
        }
    };

    updateArticleHandler = async (
        req: Request<{ id: string }, {}, UpdateArticle>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = {
                title: req.body.title,
                image: req.body.image,
            };

            const Article = await articleService.updateArticle(
                req.params.id,
                data,
                {
                    new: true,
                }
            );

            if (!Article) {
                throw new ErrorHandler(400, 'article not found!');
            }

            return res.status(200).json({
                success: true,
                message: 'updated article',
                data: Article,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteArticleHandler = async (
        req: Request<{ id: string }, {}, UpdateArticle>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const Article = await articleService.deleteArticle(req.params.id);

            if (!Article) {
                throw new ErrorHandler(400, 'article not found!');
            }

            return res.status(200).json({
                success: true,
                message: 'deleted article',
            });
        } catch (error) {
            next(error);
        }
    };

    getArticle = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response<GenericResponse<Article>>,
        next: NextFunction
    ) => {
        try {
            const Article = await articleService.getArticleById(req.params.id);

            if (!Article) {
                throw new ErrorHandler(404, 'article not found');
            }

            return res.status(200).json({
                success: true,
                message: 'article found',
                data: Article,
            });
        } catch (error) {
            next(error);
        }
    };

    getArticles = async (
        req: Request<{}, {}, {}, PaginationQuery>,
        res: Response<GenericResponse<any> & { total: number }>,
        next: NextFunction
    ) => {
        try {
            const page = req.query.page!;
            const limit = req.query.limit!;
            const total = await articleService.countRecords();
            const Articles = await articleService.getArticles(page, limit);

            return res.status(200).json({
                success: true,
                message: `total records fetched ${total}`,
                data: Articles,
                total,
            });
        } catch (error) {
            next(error);
        }
    };

    getAllArticles = async (
        req: Request<{}, {}, {}, PaginationQuery>,
        res: Response<GenericResponse<any> & { total: number }>,
        next: NextFunction
    ) => {
        try {
            const total = await articleService.countRecords();
            const Articles = await articleService.getAllArticles();

            return res.status(200).json({
                success: true,
                message: `total records fetched ${total}`,
                data: Articles,
                total,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default ArticleController;

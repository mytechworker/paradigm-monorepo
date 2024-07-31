import { Router } from 'express';

import { deserializeUser, allowedRoles } from '../middlewares/authHelpers';
import { uploadMultipleImages } from '../middlewares/uploadSingleImage';

import { Article } from '../controllers';

const ArticleController = new Article();

const articleRoutes = Router();

articleRoutes.route('/all').get(ArticleController.getAllArticles);

articleRoutes
    .route('/')
    .post(
        deserializeUser,
        allowedRoles(['admin']),
        uploadMultipleImages([
            { name: 'image', maxCount: 1 },
            { name: 'authorImage', maxCount: 1 },
        ]),
        ArticleController.createArticleHandler
    )
    .get(ArticleController.getArticles);

articleRoutes
    .route('/:id')
    .get(ArticleController.getArticle)
    .put(
        deserializeUser,
        allowedRoles(['admin']),
        uploadMultipleImages([
            { name: 'image', maxCount: 1 },
            { name: 'authorImage', maxCount: 1 },
        ]),
        ArticleController.updateArticleHandler
    )
    .delete(
        deserializeUser,
        allowedRoles(['admin']),
        ArticleController.deleteArticleHandler
    );

export default articleRoutes;

import { DocumentType } from '@typegoose/typegoose';
import { ArticlesModel } from '../db/schema';
import { Article } from '../db/schema/articles.schema';

import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

class ArticleService {
    /**
     *
     * @param article create article fields
     * @returns created article response
     */
    public createArticle = async (article: Partial<Article>) => {
        return await ArticlesModel.create(article);
    };

    /**
     *
     * @param id param id
     * @param data update article fields
     * @param options query options
     * @returns updated article response
     */
    async updateArticle(
        id: string,
        data: UpdateQuery<Article>,
        options?: QueryOptions
    ) {
        const article = await ArticlesModel.findByIdAndUpdate(
            id,
            data,
            options
        ).lean();

        return article;
    }

    /**
     *
     * @param id param id
     * @returns deleted article response
     */
    async deleteArticle(id: string) {
        return await ArticlesModel.findByIdAndDelete(id);
    }

    /**
     *
     * @param query filter query options
     * @param options query options
     * @returns matched article response
     * @example
     * const user = await getArticle({title : "abc"}, {lean: true})
     */
    async getArticle(query: FilterQuery<Article>, options?: QueryOptions) {
        const article = await ArticlesModel.findOne(query, {}, options);

        return article;
    }

    async getArticleById(id: string) {
        const article = await ArticlesModel.findById(id);

        return article;
    }

    async getArticles(page: number, limit: number) {
        const _page = page || 1;
        const _limit = limit || 10;

        const skip = (_page - 1) * _limit;

        const articles = await ArticlesModel.find().skip(skip).limit(_limit);

        return articles;
    }

    async getAllArticles() {
        const articles = await ArticlesModel.find().sort({ createdAt: -1 });

        return articles;
    }

    async countRecords() {
        return await ArticlesModel.find().countDocuments();
    }
}

export default ArticleService;

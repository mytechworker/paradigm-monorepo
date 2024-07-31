import { CategoriesModel } from '../db/schema';
import { Category } from '../db/schema/categories.schema';

import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
class CategoryService {
    /**
     *
     * @param category create category fields
     * @returns created category response
     */
    public createCategory = async (category: Partial<Category>) => {
        return await CategoriesModel.create(category);
    };

    /**
     *
     * @param id param id
     * @param data update category fields
     * @param options query options
     * @returns updated category response
     */
    async updateCategory(
        id: string,
        data: UpdateQuery<Category>,
        options?: QueryOptions
    ) {
        const category = await CategoriesModel.findByIdAndUpdate(
            id,
            data,
            options
        ).lean();

        return category;
    }

    /**
     *
     * @param id param id
     * @returns deleted category response
     */
    async deleteCategory(id: string) {
        return await CategoriesModel.findByIdAndDelete(id);
    }

    /**
     *
     * @param query filter query options
     * @param options query options
     * @returns matched category response
     * @example
     * const user = await getCategory({title : "abc"}, {lean: true})
     */
    async getCategory(query: FilterQuery<Category>, options?: QueryOptions) {
        const category = await CategoriesModel.findOne(query, {}, options);

        return category;
    }

    async getCategoryById(id: string) {
        const category = await CategoriesModel.findById(id);

        return category;
    }

    /**
     *
     * @param page current page
     * @param limit per page limit
     * @returns pagination result
     */
    async getCategories(page: number, limit: number) {
        const _page = page || 1;
        const _limit = limit || 10;

        const skip = (_page - 1) * _limit;

        const categories = await CategoriesModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(_limit);

        return categories;
    }

    async getAllCategories() {
        const categories = await CategoriesModel.find().sort({ createdAt: -1 });

        return categories;
    }

    async countRecords() {
        return await CategoriesModel.find().countDocuments();
    }
}

export default CategoryService;

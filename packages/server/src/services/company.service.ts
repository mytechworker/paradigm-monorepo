import { CompanyModel } from '../db/schema';
import { Company } from '../db/schema/companies.schema';

import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
class CompanyService {
    /**
     *
     * @param company create company fields
     * @returns created company response
     */
    public createCompany = async (company: Partial<Company>) => {
        return await CompanyModel.create(company);
    };

    /**
     *
     * @param id param id
     * @param data update company fields
     * @param options query options
     * @returns updated company response
     */
    async updateCompany(
        id: string,
        data: UpdateQuery<Company>,
        options?: QueryOptions
    ) {
        const company = await CompanyModel.findByIdAndUpdate(
            id,
            data,
            options
        ).lean();

        return company;
    }

    /**
     *
     * @param id param id
     * @returns deleted company response
     */
    async deleteCompany(id: string) {
        return await CompanyModel.findByIdAndDelete(id);
    }

    /**
     *
     * @param query filter query options
     * @param options query options
     * @returns matched company response
     * @example
     * const user = await getCategory({title : "abc"}, {lean: true})
     */
    async getCompany(query: FilterQuery<Company>, options?: QueryOptions) {
        const company = await CompanyModel.findOne(query, {}, options);

        return company;
    }

    async getCompanyById(id: string) {
        const company = await CompanyModel.findById(id);

        return company;
    }

    /**
     *
     * @param page current page
     * @param limit per page limit
     * @returns pagination result
     */
    async getCompanies(page: number, limit: number) {
        const _page = page || 1;
        const _limit = limit || 10;

        const skip = (_page - 1) * _limit;

        const categories = await CompanyModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(_limit);

        return categories;
    }

    async getAllCompanies() {
        const categories = await CompanyModel.find().sort({ createdAt: -1 });

        return categories;
    }

    async countRecords() {
        return await CompanyModel.find().countDocuments();
    }
}

export default CompanyService;

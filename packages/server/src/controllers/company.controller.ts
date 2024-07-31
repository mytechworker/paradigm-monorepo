import { Request, Response, NextFunction, Handler } from 'express';
import { DocumentType } from '@typegoose/typegoose';

import { Company } from '../db/schema/companies.schema';

import { CompanyService } from '../services';

import { CreateCompany, UpdateCompany } from '../types/company.types';
import { GenericResponse, PaginationQuery } from '../types/default.types';

import ErrorHandler from '../utils/errorHandler';

// instance
const companyService = new CompanyService();

class CompanyController {
    createCompanyHandler: Handler = async (
        req: Request<{}, {}, CreateCompany>,
        res: Response<GenericResponse<DocumentType<Company>>>,
        next
    ) => {
        try {
            // if (!req.file) {
            //     throw new ErrorHandler(404, 'company image field is required!');
            // }

            const lastIndex = await companyService.getCompany(
                {},
                {
                    sort: { index: -1 },
                    new: true,
                }
            );

            const data = {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                bannerImage: req.body.bannerImage,
                numArr: req.body.numArr,
                index: !lastIndex ? 0 : lastIndex!.index + 1,
                // totalFollowers: req.body.totalFollowers, [TODO: get subscribed users count]
            } as CreateCompany;

            const Company = await companyService.createCompany(data);

            await Company.save();

            return res.status(201).json({
                success: true,
                message: 'company created',
                data: Company,
            });
        } catch (error) {
            next(error);
        }
    };

    updateCompanyHandler = async (
        req: Request<{ id: string }, {}, UpdateCompany>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                bannerImage: req.body.bannerImage,
                numArr: req.body.numArr,
                // index: !lastIndex ? 0 : lastIndex!.index + 1, [TODO: update dragged indexs]
                // totalFollowers: req.body.totalFollowers, [TODO: get subscribed users count]
            } as UpdateCompany;
            const Company = await companyService.updateCompany(
                req.params.id,
                data,
                {
                    new: true,
                }
            );

            if (!Company) {
                throw new ErrorHandler(400, 'company not found!');
            }

            return res.status(200).json({
                success: true,
                message: 'updated company',
                data: Company,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteCompanyHandler = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const Company = await companyService.deleteCompany(req.params.id);

            if (!Company) {
                throw new ErrorHandler(400, 'company not found!');
            }

            return res.status(200).json({
                success: true,
                message: 'company removed.',
            });
        } catch (error) {
            next(error);
        }
    };

    getCompany = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response<GenericResponse<Company>>,
        next: NextFunction
    ) => {
        try {
            const Company = await companyService.getCompanyById(req.params.id);

            if (!Company) {
                throw new ErrorHandler(404, 'company not found');
            }

            return res.status(200).json({
                success: true,
                message: 'company found',
                data: Company,
            });
        } catch (error) {
            next(error);
        }
    };

    getCompanies = async (
        req: Request<{}, {}, {}, PaginationQuery>,
        res: Response<GenericResponse<any> & { total: number }>,
        next: NextFunction
    ) => {
        try {
            const page = req.query.page!;
            const limit = req.query.limit!;
            const total = await companyService.countRecords();
            const Categories = await companyService.getCompanies(page, limit);

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

    getAllCompanies = async (
        req: Request<{}, {}, {}>,
        res: Response<GenericResponse<any> & { total: number }>,
        next: NextFunction
    ) => {
        try {
            const total = await companyService.countRecords();
            const Categories = await companyService.getAllCompanies();

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

export default CompanyController;

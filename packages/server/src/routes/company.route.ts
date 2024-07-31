import { Router } from 'express';

import { deserializeUser, allowedRoles } from '../middlewares/authHelpers';
import { uploadMultipleImages } from '../middlewares/uploadSingleImage';

import { Company } from '../controllers';

const CompanyController = new Company();

const categoryRoutes = Router();

categoryRoutes.route('/all').get(CompanyController.getAllCompanies);

categoryRoutes
    .route('/')
    .post(
        deserializeUser,
        allowedRoles(['admin']),
        // uploadSingleImage('image'),
        uploadMultipleImages([
            { name: 'image', maxCount: 1 },
            { name: 'bannerImage', maxCount: 1 },
        ]),
        CompanyController.createCompanyHandler
    )
    .get(CompanyController.getCompanies);

categoryRoutes
    .route('/:id')
    .get(CompanyController.getCompany)
    .put(
        deserializeUser,
        allowedRoles(['admin']),
        uploadMultipleImages([
            { name: 'image', maxCount: 1 },
            { name: 'bannerImage', maxCount: 1 },
        ]),
        CompanyController.updateCompanyHandler
    )
    .delete(
        deserializeUser,
        allowedRoles(['admin']),
        CompanyController.deleteCompanyHandler
    );

export default categoryRoutes;

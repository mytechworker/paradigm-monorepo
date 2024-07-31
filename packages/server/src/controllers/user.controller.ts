import { Request, Response, NextFunction } from 'express';
import lodash from 'lodash';

import { User } from '../db/schema/users.schema';

import { UserService } from '../services';

import { User as CreateUser } from '../types/user.types';
import {
    PaginationQuery,
    PaginationResponse,
    GenericResponse,
} from '../types/default.types';

import ErrorHandler from '../utils/errorHandler';
import unlink from '../utils/unlinkImages';
import { DocumentType } from '@typegoose/typegoose';

const userService = new UserService();

const excludedFields = ['password', 'createdAt', 'updatedAt', '__v'];

class UserController {
    public createUserHandler = async (
        req: Request<{}, {}, Partial<CreateUser>>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                ...req.body,
            } as Partial<CreateUser>;

            const user = await userService.createUser(data);

            res.status(201).json({
                success: true,
                message: 'Registration successful',
                data: lodash.omit(user.toObject(), excludedFields),
            });
        } catch (error) {
            next(error);
        }
    };

    public getUserHandler = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response<GenericResponse<DocumentType<User>>>,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;

            const user = await userService.getUserById(id);

            if (!user) {
                throw new ErrorHandler(404, 'User not found');
            }

            res.status(200).json({
                success: true,
                message: 'User found',
                data: user.toObject(),
            });
        } catch (error) {
            next(error);
        }
    };

    public getUsersHandler = async (
        req: Request<{}, {}, {}, PaginationQuery>,
        res: Response<
            PaginationResponse<DocumentType<User>> & { total: number }
        >,
        next: NextFunction
    ) => {
        try {
            const page = req.query.page!;
            const limit = req.query.limit!;

            const users = await userService.getUsers(page, limit);

            const total = await userService.countRecords();

            res.status(200).json({
                success: true,
                message: 'Users found',
                data: users,
                total,
            });
        } catch (error) {
            next(error);
        }
    };

    public updateUserHandler = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const User = await userService.updateUser(id, req.body, {
                new: true,
            });

            if (!User) {
                throw new ErrorHandler(404, 'User not found');
            }

            res.status(200).json({
                success: true,
                message: 'User updated',
                data: User,
            });
        } catch (error) {
            next(error);
        }
    };

    public deleteUserHandler = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;

            const User = await userService.getUser({ _id: id });

            if (!User) {
                throw new ErrorHandler(404, 'User not found');
            }

            await unlink([User.image, User.bannerImage], 'users');

            await userService.deleteUser(id);

            res.status(200).json({
                success: true,
                message: 'User deleted',
            });
        } catch (error) {
            next(error);
        }
    };

    public getMeHandler = async (
        req: Request<{}, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const authUserId = res.locals.user.id;

            const User = await userService.getUser(
                {
                    _id: authUserId,
                },
                {
                    lean: true,
                    // populate: {
                    //   path: "following_company",
                    // },
                }
            );

            if (!User) {
                throw new ErrorHandler(404, 'User not found');
            }

            res.status(200).json({
                success: true,
                message: 'User found',
                data: User,
            });
        } catch (error) {
            next(error);
        }
    };

    public changeAvtar = async (
        req: Request<{}, {}, { image: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.file) {
                throw new ErrorHandler(
                    404,
                    'image not found! image need to be uploaded!'
                );
            }

            const AuthId = res.locals.user.id;

            const User = await userService.getUser(
                {
                    _id: AuthId,
                },
                {
                    new: true,
                }
            );

            if (!User) {
                throw new ErrorHandler(404, 'user not found!');
            }

            await unlink(User.image, 'users');

            User.image = req.body.image;

            await User.save();

            res.status(200).json({
                success: true,
                messsage: 'updatar changed successfully.',
                data: User,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;

import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import lodash from 'lodash';

import { AuthService, UserService } from '../services';

import { User as CreateUser, UserLogin } from '../types/user.types';

import config from '../config/default';
import ErrorHandler from '../utils/errorHandler';

const authService = new AuthService();
const userService = new UserService();

const excludedFields = ['password', 'createdAt', 'updatedAt', '__v'];

class AuthController {
    public loginHandler = async (
        req: Request<{}, {}, UserLogin>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = {
                email: req.body.email,
                password: req.body.password,
            };

            const User = await userService.getUser(
                { email: data.email },
                { projection: { password: 1, role: 1 } }
            );

            if (!User) {
                throw new ErrorHandler(404, 'User not found');
            } else {
                // if (User.role !== req.body.loginType) {
                //     throw new ErrorHandler(
                //         403,
                //         'your role is not authorized to access the following resource.'
                //     );
                // }

                const isPasswordMatch = await User.comparePasswords(
                    User.password,
                    data.password
                );

                if (!isPasswordMatch) {
                    throw new ErrorHandler(400, 'Invalid credentials');
                }

                const token = await authService.signTokens(User);

                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    token,
                });
            }
        } catch (error) {
            next(error);
        }
    };

    public registerHandler = async (
        req: Request<{}, {}, Partial<CreateUser>>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
            } as Partial<CreateUser>;

            const user = await authService.register(data);

            res.status(200).json({
                success: true,
                message: 'Registration successful',
                data: lodash.omit(user.toObject(), excludedFields),
            });
        } catch (error) {
            next(error);
        }
    };

    // might need to be changed later
    public forgotPasswordHandler = async (
        req: Request<{}, {}, { email: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await userService.getUser({ email: req.body.email });

            if (!user) {
                throw new ErrorHandler(404, 'User not found');
            }

            const hash = user.generateVerificationToken();

            await user.save();

            const path = `${config.api_prefix}/auth`;
            // const resetUrl = `${config.api_url.concat(path)}/reset-password/${hash}`;
            const resetUrl = `${config.client_url.concat(
                path
            )}/reset-password/${hash}}`;

            await authService.sendResetPasswordEmail(user, resetUrl);

            res.status(200).json({
                success: true,
                message: 'Forgot password successful',
                resetUrl,
            });
        } catch (error) {
            console.log(`catched error >>>`, error);
            next(error);
        }
    };

    public resetPasswordHandler = async (
        req: Request<{ resetPasswordToken: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.verifyVerificationToken(
                req.params.resetPasswordToken
            );

            user.verificationToken = undefined;

            res.status(200).json({
                success: true,
                message: 'Reset password successful',
                data: lodash.omit(user.toObject(), excludedFields),
            });
        } catch (error) {
            next(error);
        }
    };

    async verifyVerificationToken(token: string) {
        const hash = crypto.createHash('sha256').update(token).digest('hex');

        const user = await userService.getUser({ verificationToken: hash });

        if (!user) {
            throw new ErrorHandler(400, 'Invalid token');
        }

        return user;
    }
}

export default AuthController;

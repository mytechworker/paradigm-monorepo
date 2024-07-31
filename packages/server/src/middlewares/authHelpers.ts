import { Request, Response, NextFunction } from 'express';

import { UserService } from '../services';

import { verifyJWT } from '../utils/jwt';
import ErrorHandler from '../utils/errorHandler';

import config from '../config/default';

const userService = new UserService();

// function to check if user is authenticated
export const deserializeUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        let token: string = req.headers.authorization.split(' ')[1];

        verifyJWT(token, config.secrectKey)
            .then((decoded) => {
                res.locals.user = decoded;

                next();
            })
            .catch((err) => {
                console.log(`>>> err <<<`, err);

                next(err);
            });
    } else {
        next(new ErrorHandler(404, 'authentication failed token not found!'));
    }
};

// function to check if user is admin or not (for admin routes)
export const allowedRoles = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { user } = res.locals;

        const User = await userService.getUser({ _id: user.id });

        if (User && roles.includes(User.role)) {
            next();
        } else {
            res.status(403).json({
                success: false,
                message: 'You are not authorized to access this resource',
            });
        }
    };
};

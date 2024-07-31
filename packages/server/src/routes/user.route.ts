import { Router } from 'express';

// controllers
import { User } from '../controllers';

// middlewares
import { deserializeUser, allowedRoles } from '../middlewares/authHelpers';
import {
    uploadMultipleImages,
    uploadSingleImage,
} from '../middlewares/uploadSingleImage';

const UserControllers = new User();

const userRoutes = Router();

userRoutes.route('/me').get(deserializeUser, UserControllers.getMeHandler);
userRoutes
    .route('/changeAvatar')
    .post(
        deserializeUser,
        uploadSingleImage('image'),
        UserControllers.changeAvtar
    );

userRoutes
    .route('/')
    .get(
        deserializeUser,
        allowedRoles(['admin', 'user']),
        UserControllers.getUsersHandler
    )
    .post(
        deserializeUser,
        allowedRoles(['admin']),
        uploadMultipleImages([
            { name: 'image', maxCount: 1 },
            { name: 'bannerImage', maxCount: 1 },
        ]),
        UserControllers.createUserHandler
    );

userRoutes
    .route('/:id')
    .get(
        deserializeUser,
        allowedRoles(['admin']),
        UserControllers.getUserHandler
    )
    .put(
        deserializeUser,
        allowedRoles(['admin']),
        UserControllers.updateUserHandler
    )
    .delete(
        deserializeUser,
        allowedRoles(['admin']),
        UserControllers.deleteUserHandler
    );

export default userRoutes;

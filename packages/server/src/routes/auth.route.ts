import { Router } from 'express';

// controllers
import { Auth } from '../controllers';

const AuthController = new Auth();

const authRoutes = Router();

authRoutes.route('/login').post(AuthController.loginHandler);

authRoutes.route('/register').post(AuthController.registerHandler);

authRoutes.route('/forgot-password').post(AuthController.forgotPasswordHandler);

authRoutes
    .route('/reset-password/:resetPasswordToken')
    .post(AuthController.resetPasswordHandler);

export default authRoutes;

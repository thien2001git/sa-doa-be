import express from 'express';
import AuthController from '../../api/src/presentation/Controllers/AuthController';
import { validateUserLogin } from '../../api/src/presentation/validations/auth.validation';
import { validateUserRegisterOrUpdate } from '../../api/src/presentation/validations/user.validation';

const authRouter = (app: express.Express) => {
    const router = express.Router();
    router.post('/register', validateUserRegisterOrUpdate, AuthController.register);
    router.post('/login', validateUserLogin, AuthController.login);
    router.post('/forgot-password', AuthController.forgotPassword);
    app.use('/auth', router);
};

export default authRouter;

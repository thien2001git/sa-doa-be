import express from 'express';
import UserController from '../../api/src/presentation/Controllers/UserController';
import { authMiddleware } from '../../api/src/presentation/middlewares/auth.middleware';
import { validateUserChangePassword, validateUserUpdate } from '../../api/src/presentation/validations/user.validation';

const meRouter = (app: express.Express) => {
    const router = express.Router();
    // domain/user/1
    router.use(authMiddleware);
    router.get('/info', UserController.meInfo);
    router.put('/update', validateUserUpdate, UserController.meUpdate);
    router.put('/change-password', validateUserChangePassword, UserController.meChangePassword);
    app.use('/me', router); // domain/user
};

export default meRouter;

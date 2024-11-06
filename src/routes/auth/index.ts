import express from 'express';
import AuthController from '../../api/src/presentation/Controllers/AuthController';

const authRouter = (app: express.Express) => {
    const router = express.Router();
    router.post('/register', AuthController.register);
    router.post('/login', AuthController.login);
    router.post('/forgot-password', AuthController.forgotPassword);
    app.use('/auth', router);
};

export default authRouter;

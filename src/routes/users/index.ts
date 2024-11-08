import express from 'express';
import UserController from '../../api/src/presentation/Controllers/UserController';
import { authMiddleware } from '../../api/src/presentation/middlewares/auth.middleware';

const userRouter = (app: express.Express) => {
    const router = express.Router();
    // domain/user/1
    router.use(authMiddleware);
    router.get('/', UserController.index);
    router.get('/check-token', UserController.checkToken);
    router.post('/create', UserController.create);
    router.put('/update', UserController.update);
    router.delete('/delete', UserController.delete);
    app.use('/users', router); // domain/user
};

export default userRouter;

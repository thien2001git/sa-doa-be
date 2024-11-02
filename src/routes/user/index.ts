import express from 'express';
import UserController from '../../api/src/presentation/Controllers/UserController';

const useRouter = (app: express.Express) => {
    const router = express.Router();
    // domain/user/1
    router.get('/', UserController.index);
    router.post('/create', UserController.create);
    router.put('/update', UserController.update);
    router.delete('/delete', UserController.delete);
    app.use('/user', router); // domain/user
};

export default useRouter;

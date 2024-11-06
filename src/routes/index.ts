import express from 'express';
import { responseErrors, responseSuccess } from '../helpers';
import authRouter from './auth';
import useRouter from './users';
const router = (app: express.Express) => {
    app.get('/', (_, res) => responseSuccess(res, null, 200, 'Thành công'));
    authRouter(app);
    useRouter(app);
    app.all('*', (_, res) => responseErrors(res, 404, '404 Not Found'));
};
export default router;

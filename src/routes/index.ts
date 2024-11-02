import express from 'express';
import { responseErrors, responseSuccess } from '../helpers';
import useRouter from './user';
const router = (app: express.Express) => {
    app.get('/', (_, res) => responseSuccess(res, 'success', 200));
    useRouter(app);
    app.all('*', (_, res) => responseErrors(res, 404, '404 Not Found'));
};
export default router;

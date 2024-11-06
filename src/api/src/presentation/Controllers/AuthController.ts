import express from 'express';
import { responseErrors, responseSuccess } from '../../../../helpers';
import { hashHmacString } from '../../../../helpers/crypto';
import userCollection from '../../data/mongodb/collections/UserCollection';
import BaseController from './base.controller';

class AuthController extends BaseController {
    async register(req: express.Request, res: express.Response) {
        console.log(req.body);
        try {
            const { body } = req;
            const newPass = hashHmacString(body.password);
            const userCreated = await userCollection.store({
                ...body,
                password: newPass,
            });
            return responseSuccess(res, userCreated);
        } catch (error: any) {
            return responseErrors(res, 400, error.message);
        }
    }
    async login(req: express.Request, res: express.Response) {
        console.log(req.body);
        return responseSuccess(res, 'login');
    }
    async forgotPassword(req: express.Request, res: express.Response) {
        console.log(req.body);
        return responseSuccess(res, 'forgotPassword');
    }
}

export default new AuthController();

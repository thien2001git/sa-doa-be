import express from 'express';
import { responseErrors, responseSuccess, responseUnauthorized } from '../../../../helpers';
import { generateJWTToken, hashHmacString } from '../../../../helpers/crypto';
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
            return responseErrors(res, error);
        }
    }
    async login(req: express.Request, res: express.Response) {
        console.log(req.body);
        try {
            const emailOrUsername = req.body.username;
            const password = req.body.password;
            if (!emailOrUsername || !password) return responseErrors(res, 'Username or password is empty', 400);
            const userDb = await userCollection.findByUsernameOrEmail(emailOrUsername);
            if (!userDb) return responseErrors(res, 'User not found', 400);
            if (hashHmacString(password) !== userDb.password) return responseUnauthorized(res, 'Password is incorrect');
            return responseSuccess(res, {
                user: userDb,
                token: generateJWTToken(userDb._id),
                // user: userDb, api riêng
            });
        } catch (e: any) {
            return responseErrors(res, e);
        }
    }
    async forgotPassword(req: express.Request, res: express.Response) {
        console.log(req.body);
        return responseSuccess(res, 'forgotPassword');
    }
}

export default new AuthController();

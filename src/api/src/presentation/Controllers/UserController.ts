import express from 'express';
import { responseErrors, responseSuccess } from '../../../../helpers';
import { hashHmacString } from '../../../../helpers/crypto';
import userCollection from '../../data/mongodb/collections/UserCollection';
import BaseController from './base.controller';

class UserController extends BaseController {
    async index(req: express.Request, res: express.Response) {
        try {
            const users = await userCollection.paginate({});
            return responseSuccess(res, users);
        } catch (error: any) {
            return responseErrors(res, error);
        }
    }
    async create(req: express.Request, res: express.Response) {
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
            return responseErrors(res, error.message, 400);
        }
    }
    async update(req: express.Request, res: express.Response) {
        try {
            console.log(req.body);
            const user = await userCollection.update(req.body.id, req.body);
            return responseSuccess(res, user);
        } catch (error: any) {
            return responseErrors(res, error.message, 400);
        }
    }
    async delete(req: express.Request, res: express.Response) {
        console.log(req.body);
        try {
            const useDeleted = await userCollection.delete(req.body.id);
            return responseSuccess(res, useDeleted);
        } catch (error: any) {
            return responseErrors(res, error.message, 400);
        }
    }
}

export default new UserController();

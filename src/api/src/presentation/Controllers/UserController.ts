import express from 'express';
import { responseErrors, responseSuccess } from '../../../../helpers';
import userCollection from '../../data/mongodb/collections/UserCollection';
import BaseController from './base.controller';

class UserController extends BaseController {
    async index(req: express.Request, res: express.Response) {
        try {
            const users = await userCollection.paginate({});
            return responseSuccess(res, users);
        } catch (error: any) {
            return responseErrors(res, 400, error.message);
        }
    }
    async create(req: express.Request, res: express.Response) {
        console.log(req.body);
        try {
            const userCreated = await userCollection.store(req.body);
            return responseSuccess(res, userCreated);
        } catch (error: any) {
            return responseErrors(res, 400, error.message);
        }
    }
    async update(req: express.Request, res: express.Response) {
        try {
            console.log(req.body);
            const user = await userCollection.update(req.body.id, req.body);
            return responseSuccess(res, user);
        } catch (error: any) {
            return responseErrors(res, 400, error.message);
        }
    }
    async delete(req: express.Request, res: express.Response) {
        console.log(req.body);
        try {
            const useDeleted = await userCollection.delete(req.body.id);
            return responseSuccess(res, useDeleted);
        } catch (error: any) {
            return responseErrors(res, 400, error.message);
        }
    }
}

export default new UserController();

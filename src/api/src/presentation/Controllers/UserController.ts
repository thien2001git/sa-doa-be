import express from 'express';
import { responseErrors, responseSuccess } from '../../../../helpers';
import userCollection from '../../data/mongodb/collections/UserCollection';
import BaseController from './base.controller';

class UserController extends BaseController {
    async index(req: express.Request, res: express.Response) {
        try {
            const users = await userCollection.findAll();
            return responseSuccess(res, users);
        } catch (error: any) {
            return responseErrors(res, 400, error.message);
        }
    }
    async create(req: express.Request, res: express.Response) {
        console.log(req.body);
        try {
            if (req.body !== undefined) {
                userCollection
                    .create(req.body)
                    .then((r) => {
                        res.send(true);
                    })
                    .catch((e) => {
                        console.log(e);
                        res.send(false);
                    });
            } else {
                return responseErrors(res, 404, 'Body not found');
            }
        } catch (error: any) {
            return responseErrors(res, 400, error.message);
        }
    }
    async update(req: express.Request, res: express.Response) {
        try {
            console.log(req.body);
            if (req.body !== undefined) {
                const user = await userCollection.upsert({ _id: req.body.id }, req.body);
                return responseSuccess(res, user);
            } else {
                return responseErrors(res, 404, 'Body not found');
            }
        } catch (error: any) {
            return responseErrors(res, 400, error.message);
        }
    }
    async delete(req: express.Request, res: express.Response) {
        console.log(req.body);
        try {
            const useDeleted = await userCollection.delete(req.body);
            return responseSuccess(res, useDeleted);
        } catch (error: any) {
            return responseErrors(res, 400, error.message);
        }
    }
}

export default new UserController();

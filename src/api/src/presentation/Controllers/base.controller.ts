import express from 'express';
import { responseErrors, responseSuccess } from '../../../../helpers';

class BaseController {
    async index(_: express.Request, res: express.Response) {
        try {
            return responseSuccess(res, null);
        } catch (error: any) {
            return responseErrors(res, error.message, 400);
        }
    }
}

export default BaseController;

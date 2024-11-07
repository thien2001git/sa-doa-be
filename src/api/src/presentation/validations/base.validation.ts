import express from 'express';
import Joi from 'joi';
import { responseErrors } from '../../../../helpers';

type TypeDataTypes = 'body' | 'query' | 'params';
export const baseJoiValidator = (schema: Joi.ObjectSchema, typeData: TypeDataTypes = 'body') => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let data = null;
        switch (typeData) {
            case 'body':
                data = req.body;
                break;
            case 'query':
                data = req.query;
                break;
            case 'params':
                data = req.params;
                break;
            default:
                data = req.body;
        }
        const result = schema.validate(data);
        if (result.error) {
            console.log('Validation', result.error);
            return responseErrors(res, result.error.details?.[0]?.message ?? 'Invalid', 422);
        }
        next();
    };
};

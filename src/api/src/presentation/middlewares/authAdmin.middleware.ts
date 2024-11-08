import express from 'express';
import { responseErrors, responseUnauthorized } from '../../../../helpers';
import { parserJWTToken } from '../../../../helpers/crypto';
import userCollection from '../../data/mongodb/collections/UserCollection';

export const authAdminMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const responseToken = parserJWTToken(req.headers.authorization);
    if (!responseToken.success) return responseUnauthorized(res, 'Token Error');
    try {
        const userId = responseToken.payload.id;
        const userDB = await userCollection.findById(userId);
        if (!userDB || userDB.role_level !== 0) return responseUnauthorized(res, 'User not found');
        res.locals.authAdmin = userDB;
        console.log(userDB);

        next();
    } catch (e: any) {
        return responseErrors(res, e);
    }
};

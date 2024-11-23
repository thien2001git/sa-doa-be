import express from 'express';
import {responseErrors, responseSuccess, responseUsers} from '../../../../helpers';
import { hashHmacString } from '../../../../helpers/crypto';
import userCollection from '../../data/mongodb/collections/UserCollection';
import BaseController from './base.controller';

class UserController extends BaseController {
    //Xem thông tin tài khoản của mình / đã đăng nhập
    async meInfo(req: express.Request, res: express.Response) {
        try {
            const userDB = await userCollection.findById(res.locals.authUser?._id);
            return responseSuccess(res, userDB);
        } catch (error: any) {
            return responseErrors(res, error);
        }
    }
    //Cập nhật thông tin tài khoản của mình / đã đăng nhập
    async meUpdate(req: express.Request, res: express.Response) {
        try {
            const userDB = await userCollection.update(res.locals.authUser?._id, req.body);
            return responseSuccess(res, userDB, 200, 'Cập nhật thông tin thành công');
        } catch (error: any) {
            return responseErrors(res, error);
        }
    }
    // Đổi mật khẩu của mình / đã đăng nhập
    async meChangePassword(req: express.Request, res: express.Response) {
        try {
            const { current_password, new_password, confirm_password } = req.body;
            if (hashHmacString(current_password) !== res.locals.authUser?.password)
                return responseErrors(res, 'Mật khẩu hiện tại không đúng', 400);
            if (new_password !== confirm_password)
                return responseErrors(res, 'Mật khẩu mới và xác nhận mật khẩu không khớp', 400);
            const newPass = hashHmacString(new_password);
            const userDB = await userCollection.update(res.locals.authUser?._id, {
                password: newPass,
            });
            return responseSuccess(res, userDB, 200, 'Cập nhật mật khẩu thành công');
        } catch (error: any) {
            return responseErrors(res, error);
        }
    }
    // Danh sách tất cả tài khoản
    async index(req: express.Request, res: express.Response) {
        try {
            const users = await userCollection.paginate({});
            return res.send(responseUsers(users))
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
            const user = await userCollection.update(req.body._id, req.body);
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
    async checkToken(req: express.Request, res: express.Response) {
        console.log(req.body);
        try {
            return responseSuccess(res, res.locals.authUser);
        } catch (error: any) {
            return responseErrors(res, error.message, 400);
        }
    }
}

export default new UserController();

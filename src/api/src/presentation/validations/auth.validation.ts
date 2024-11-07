import Joi from 'joi';
import { baseJoiValidator } from './base.validation';

export const validateUserLogin = baseJoiValidator(
    Joi.object({
        username: Joi.string().required().messages({
            'string.required': 'Tên người dùng không được để trống',
        }),
        password: Joi.string().required().messages({
            'string.required': 'Tên người dùng không được để trống',
        }),
    })
);

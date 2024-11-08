import Joi from 'joi';
import { baseJoiValidator } from './base.validation';

export const validateUserRegister = baseJoiValidator(
    Joi.object({
        username: Joi.string()
            .min(5)
            .max(20)
            .required()
            .pattern(/^[a-zA-Z0-9]+$/)
            .messages({
                'string.pattern.base': 'Username chỉ được chứa các ký tự từ a-z và 0-9',
                'any.required': 'Username không được để trống',
                'string.min': 'Username phải có ít nhất {#limit} ký tự',
                'string.max': 'Username không được vượt quá {#limit} ký tự',
            }),
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required()
            .messages({
                'string.email': 'Địa chỉ email không hợp lệ',
                'any.required': 'Email là bắt buộc',
            }),
        password: Joi.string().min(5).max(20).required().messages({
            'any.required': 'Mật khẩu không được để trống',
            'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
            'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự',
        }),
        role_level: Joi.any().forbidden().messages({
            'any.unknown': 'Trường role không thể nhập giá trị',
        }),
        display_name: Joi.string().required().messages({
            'any.required': 'Tên hiển thị không được để trống',
        }),
    })
);
export const validateUserUpdate = baseJoiValidator(
    Joi.object({
        username: Joi.string()
            .min(5)
            .max(20)
            .required()
            .pattern(/^[a-zA-Z0-9]+$/)
            .messages({
                'string.pattern.base': 'Username chỉ được chứa các ký tự từ a-z và 0-9',
                'any.required': 'Username không được để trống',
                'string.min': 'Username phải có ít nhất {#limit} ký tự',
                'string.max': 'Username không được vượt quá {#limit} ký tự',
            }),
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required()
            .messages({
                'string.email': 'Địa chỉ email không hợp lệ',
                'any.required': 'Email là bắt buộc',
            }),
        role_level: Joi.any().forbidden().messages({
            'any.unknown': 'Trường role không thể thay đổi',
        }),
        display_name: Joi.string().required().messages({
            'any.required': 'Tên hiển thị không được để trống',
        }),
    })
);
export const validateUserChangePassword = baseJoiValidator(
    Joi.object({
        current_password: Joi.string().required().messages({
            'any.required': 'Mật khẩu không được để trống',
        }),
        new_password: Joi.string().min(5).max(20).required().messages({
            'any.required': 'Mật khẩu mới không được để trống',
            'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
            'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự',
        }),
        confirm_password: Joi.string().required().messages({
            'any.required': 'Xác nhận mật khẩu không được để trống',
        }),
    })
);

import express from 'express';

export const responseSuccess = (res: express.Response, data: any, statusCode = 200, message = '') => {
    return res.status(statusCode).json({
        now: new Date(),
        status_code: statusCode,
        data: data,
        message: message,
    });
};

interface Error {
    now: Date;
    status_code: number;
    errors: any;
    message: string;
}

export const responseErrors = (res: express.Response, error: any, statusCode = 500, errors: any[] = []) => {
    const response: Error = {
        now: new Date(),
        status_code: statusCode,
        errors: null,
        message: 'Server error',
    };
    if (errors.length > 0) {
        response.errors = errors;
    } else delete response.errors;
    if (typeof error === 'string') {
        response.message = error;
    }
    // Lỗi đã tồn tại của mongoose
    if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        response.message = `${field?.toUpperCase()} đã tồn tại`;
        response.status_code = 409;
    } else if (error.code && error.message) {
        response.message = error.message;
        response.status_code = error.code;
    }
    if (response.status_code === 500) console.log(error);
    return res.status(response.status_code).json(response);
};
export const responseUnauthorized = (res: express.Response, message?: string) => {
    const response: Error = {
        now: new Date(),
        status_code: 401,
        errors: null,
        message: 'Token invalid or expired',
    };

    if (message) {
        response.message = message;
    }
    return res.status(response.status_code).json(response);
};

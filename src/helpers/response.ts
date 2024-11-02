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
export const responseErrors = (res: express.Response, statusCode = 500, message?: string, errors?: []) => {
    const response: Error = {
        now: new Date(),
        status_code: statusCode,
        errors: null,
        message: 'Server error',
    };
    if (errors) {
        response.errors = errors;
    }
    if (message) {
        response.message = message;
    }
    return res.status(statusCode).json(response);
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

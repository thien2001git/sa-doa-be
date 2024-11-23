interface MyResponse<T> {
    now: Date;
    status_code: number;
    data: T;
    message: string;
}

export type {MyResponse}
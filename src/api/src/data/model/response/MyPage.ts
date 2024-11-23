
interface MyPage<T> {
    docs: T;
    total: number;
    limit: number;
    page: number;
    totalPage: number;
}
export type {MyPage}
import {AxiosResponse} from "axios";

export interface  Pagination<T> {
    // count, next, previous, results
    count: number;
    next: string;
    previous: string;
    results: T[];
}

export type AxiosPagination<T> = Promise<AxiosResponse<Pagination<T>>>;

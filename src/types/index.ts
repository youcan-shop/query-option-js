export type Operator = '=' | '>' | '<' | 'LIKE'; // Add more as strings separated by '|'

export interface FilterCondition {
    field: string;
    value: any;
    operator?: Operator;
}

export type Filters = FilterCondition[];

export type SortOrder = 'asc' | 'desc';
export type Sort = Record<string, SortOrder>;

export interface Pagination {
    page: number;
    limit: number;
}

export class QueryOption {
    private _search: string;
    private _filters: FilterCondition[];
    private _sort: Sort;
    private _pagination: Pagination;

    private constructor(search: string, filters: FilterCondition[], sort: Sort, pagination: Pagination) {
        this._search = search;
        this._filters = filters;
        this._sort = sort;
        this._pagination = pagination;
    }

    public static create(search: string, filters: FilterCondition[], sort: Sort, pagination: Pagination): QueryOption {
        return new QueryOption(search, filters, sort, pagination);
    }

    get search(): string {
        return this._search;
    }

    get filters(): FilterCondition[] {
        return this._filters;
    }

    get sort(): Sort {
        return this._sort;
    }

    get pagination(): Pagination {
        return this._pagination;
    }
}

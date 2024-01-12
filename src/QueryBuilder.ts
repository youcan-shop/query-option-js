import { QueryOption, FilterCondition, Sort, Pagination } from './types';

export class QueryBuilder {
    private _filters: FilterCondition[] = [];
    private _sort: Sort = {};
    private _pagination: Pagination = { page: 1, limit: 10 };

    constructor(options?: QueryOption) {
        if (options) {
            if (options.filters) this.setFilters(options.filters);
            if (options.sort) this.setSort(options.sort);
            if (options.pagination) this.setPagination(options.pagination);
        }
    }

    private setFilters(filters: FilterCondition[]): QueryBuilder {
        this._filters = filters;
        return this;
    }

    private setSort(sort: Sort): QueryBuilder {
        this._sort = sort;
        return this;
    }

    private setPagination(pagination: Pagination): QueryBuilder {
        this._pagination = pagination;
        return this;
    }

    public getFilters(): FilterCondition[] {
        return this._filters;
    }

    public getSort(): Sort {
        return this._sort;
    }

    public getPagination(): Pagination {
        return this._pagination;
    }

    public static fromUri(uri: string): QueryBuilder {
        const url = new URL(uri, 'https://fake.com');
        const params = new URLSearchParams(url.search);

        const filters: FilterCondition[] = [];
        const sort: Sort = {};
        let pagination: Pagination = { page: 1, limit: 10 };

        params.forEach((value, key) => {
            if (key.startsWith('filters[')) {
                const field = key.match(/\[([^)]+)]/)?.[1];
                if (field) {
                    filters.push({ field, value });
                }
            } else if (key.startsWith('sort[')) {
                const field = key.match(/\[([^)]+)]/)?.[1];
                if (field) {
                    sort[field] = value as 'asc' | 'desc';
                }
            } else if (key === 'page' || key === 'limit') {
                pagination = { ...pagination, [key]: parseInt(value) };
            }
        });

        return new QueryBuilder(QueryOption.create(filters, sort, pagination));
    }

    public fromCurrent(): string {
        const parts: string[] = [];

        if (this._filters.length > 0) {
            const filters = this._filters.map(filter => {
                const operator = filter.operator || '=';
                return `${encodeURIComponent(filter.field)}${operator}${encodeURIComponent(filter.value)}`;
            }).join('&');

            parts.push(filters);
        }

        if (Object.keys(this._sort).length > 0) {
            parts.push(Object.entries(this._sort).map(([field, order]) => `sort[${encodeURIComponent(field)}]=${order}`).join('&'));
        }

        parts.push(`page=${this._pagination.page}&limit=${this._pagination.limit}`);

        return parts.filter(part => part).join('&');
    }
}

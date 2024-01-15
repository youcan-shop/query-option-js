import {FilterCondition, Pagination, QueryOption, Sort} from './types';
import {slice} from "./helpers";

export class QueryBuilder {
    private _search: string = '';
    private _filters: FilterCondition[] = [];
    private _sort: Sort = {field: 'created_at', value: 'desc'};
    private _pagination: Pagination = {page: 1, limit: 10};

    constructor(options?: QueryOption) {
        if (options) {
            if (options.search) this.setSearch(options.search);
            if (options.filters) this.setFilters(options.filters);
            if (options.sort) this.setSort(options.sort);
            if (options.pagination) this.setPagination(options.pagination);
        }
    }

    private setSearch(search: string): QueryBuilder {
        this._search = search;
        return this;
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

    public getSearch(): string {
        return this._search;
    }

    public getPagination(): Pagination {
        return this._pagination;
    }

    public static parsePage(str: string): Number {
        const regex = /page\=([^&]*)\&?/gmi;
        let m = regex.exec(str);

        return (m ? parseInt(m[1]) : 1) as Number;
    }

    public static parseLimit(str: string): Number {
        const regex = /limit\=([^&]*)\&?/gmi;
        let m = regex.exec(str);

        return (m ? parseInt(m[1]) : 10) as Number;
    }

    public static parseSearch(str: string): string {
        const regex = /q\=([^&]*)\&?/gmi;
        let m = regex.exec(str);

        return m ? m[1] : '';
    }

    public static parseSort(str: string): Sort {
        const regex = /sort\[(field|value)\]\=([^&]+)\&?/gmi;
        let sort = {field: "", value: ""};
        let m;

        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            if (m[1] == 'field') {
                sort.field = m[2];
            } else if (m[1] == 'value') {
                sort.value = m[2];
            }
        }

        return sort as Sort;
    }

    public static parseFilters(str: string): Array<FilterCondition> {
        const regex = /filters\[(\d+)\]\[(field|value|operator)\]\=([^&]+)\&?/gmi;
        let m, matches: any[] = [];

        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            let matchSlices = slice(m, 4);
            matchSlices.forEach((match) => {
                const index = parseInt(match[1]);

                if (!matches[index]) {
                    matches[index] = {};
                }

                matches[index][match[2]] = match[3];
            });
        }

        return matches;
    }

    public static fromUri(uri: string): QueryBuilder {
        const paramString = decodeURI(uri);

        const filters = this.parseFilters(paramString).map((filter) => {
            return filter;
        });
        const search = this.parseSearch(paramString);
        const sort = this.parseSort(paramString);
        const pagination = {
            page: this.parsePage(paramString),
            limit: this.parseLimit(paramString)
        } as Pagination;

        return new QueryBuilder(QueryOption.create(search, filters, sort, pagination));
    }

    public static fromCurrent(): QueryBuilder {
        return QueryBuilder.fromUri(document.location.search);
    }

    public toString(): string {
        return `q=${this._search}&sort[field]=${this._sort}&sort[value]=${this._sort}&page=${this._pagination.page}&limit=${this._pagination.limit}&` +
            this._filters.map((f, i) => `filters[${i}][field]=[${f.field}]&filters[${i}][value]=[${f.value}]&filters[${i}][operator]=[${f.operator}]`).join('&');
    }
}

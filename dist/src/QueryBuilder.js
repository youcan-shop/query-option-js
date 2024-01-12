"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const types_1 = require("./types");
class QueryBuilder {
    _search = '';
    _filters = [];
    _sort = {};
    _pagination = { page: 1, limit: 10 };
    constructor(options) {
        if (options) {
            if (options.search)
                this.setSearch(options.search);
            if (options.filters)
                this.setFilters(options.filters);
            if (options.sort)
                this.setSort(options.sort);
            if (options.pagination)
                this.setPagination(options.pagination);
        }
    }
    setSearch(search) {
        this._search = search;
        return this;
    }
    setFilters(filters) {
        this._filters = filters;
        return this;
    }
    setSort(sort) {
        this._sort = sort;
        return this;
    }
    setPagination(pagination) {
        this._pagination = pagination;
        return this;
    }
    getFilters() {
        return this._filters;
    }
    getSort() {
        return this._sort;
    }
    getSearch() {
        return this._search;
    }
    getPagination() {
        return this._pagination;
    }
    static fromUri(uri) {
        const url = new URL(uri, 'https://fake.com');
        const params = new URLSearchParams(url.search);
        let search = '';
        const filters = [];
        const sort = {};
        let pagination = { page: 1, limit: 10 };
        params.forEach((value, key) => {
            if (key.startsWith('filters[')) {
                const field = key.match(/\[([^)]+)]/)?.[1];
                if (field) {
                    filters.push({ field, value });
                }
            }
            else if (key.startsWith('sort[')) {
                const field = key.match(/\[([^)]+)]/)?.[1];
                if (field) {
                    sort[field] = value;
                }
            }
            else if (key === 'page' || key === 'limit') {
                pagination = { ...pagination, [key]: parseInt(value) };
            }
            else if (key === 'q') {
                search = value;
            }
        });
        return new QueryBuilder(types_1.QueryOption.create(search, filters, sort, pagination));
    }
    fromCurrent() {
        const parts = [];
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
        parts.push(`q=${this._search}&page=${this._pagination.page}&limit=${this._pagination.limit}`);
        return parts.filter(part => part).join('&');
    }
}
exports.QueryBuilder = QueryBuilder;

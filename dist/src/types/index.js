"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryOption = void 0;
class QueryOption {
    _search;
    _filters;
    _sort;
    _pagination;
    constructor(search, filters, sort, pagination) {
        this._search = search;
        this._filters = filters;
        this._sort = sort;
        this._pagination = pagination;
    }
    static create(search, filters, sort, pagination) {
        return new QueryOption(search, filters, sort, pagination);
    }
    get search() {
        return this._search;
    }
    get filters() {
        return this._filters;
    }
    get sort() {
        return this._sort;
    }
    get pagination() {
        return this._pagination;
    }
}
exports.QueryOption = QueryOption;

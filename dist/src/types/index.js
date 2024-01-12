"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryOption = void 0;
class QueryOption {
    _filters;
    _sort;
    _pagination;
    constructor(filters, sort, pagination) {
        this._filters = filters;
        this._sort = sort;
        this._pagination = pagination;
    }
    static create(filters, sort, pagination) {
        return new QueryOption(filters, sort, pagination);
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

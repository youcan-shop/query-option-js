import { QueryBuilder } from '../src';

describe('Test parse search', () => {
    it('should correctly parse search param', () => {
        const uri = 'http://example.com/api/data?q=test';
        const search = QueryBuilder.parseSearch(uri);

        expect(search).toEqual('test');
    });
});

describe('Test parse pagination', () => {
    it('should correctly parse pagination params', () => {
        const uri = 'http://example.com/api/data?page=2&limit=20';
        const page = QueryBuilder.parsePage(uri);
        const limit = QueryBuilder.parseLimit(uri);

        expect(page).toEqual(2);
        expect(limit).toEqual(20);
    });
});

describe('Test parse sort', () => {
    it('should correctly parse sort params', () => {
        const uri = 'http://example.com/api/data?sort[field]=age&sort[value]=asc';
        const sort = QueryBuilder.parseSort(uri);

        expect(sort).toEqual({field: 'age', value: 'asc'});
    });
});

describe('Test parse filters', () => {
    it('should correctly parse filters params', () => {
        const uri = 'http://example.com/api/data?filters[0][field]=name&filters[0][value]=John&filters[1][field]=age&filters[1][value]=30&filters[1][operator]=<';
        const filters = QueryBuilder.parseFilters(uri);

        expect(filters.length).toEqual(2);
        expect(filters[0]).toEqual({field: 'name', value: 'John'});
        expect(filters[1]).toEqual({field: 'age', value: '30', operator: '<'});
    });
});

describe('Test create from URI', () => {
    it('should correctly parse URI with filters, sort, and pagination', () => {
        const uri = 'http://example.com/api/data?q=test&filters[0][field]=name&filters[0][value]=John&filters[1][field]=age&filters[1][value]=30&filters[1][operator]=<&sort[field]=age&sort[value]=asc&page=2&limit=10';
        const queryBuilder = QueryBuilder.fromUri(uri);

        expect(queryBuilder.getSearch()).toEqual('test');
        expect(queryBuilder.getFilters()).toEqual([{ field: 'name', value: 'John' }, { field: 'age', value: '30', operator: '<'}]);
        expect(queryBuilder.getSort()).toEqual({field: 'age', value: 'asc'});
        expect(queryBuilder.getPagination()).toEqual({ page: 2, limit: 10 });
    });
});

describe('Test create from URI with no params', () => {
    it('should correctly parse URI with filters, sort, and pagination', () => {
        const uri = 'http://example.com/api/data';

        const queryBuilder = QueryBuilder.fromUri(uri);

        expect(queryBuilder.getSearch()).toEqual('');
        expect(queryBuilder.getFilters()).toEqual([]);
        expect(queryBuilder.getSort()).toEqual({field: '', value: ''});
        expect(queryBuilder.getPagination()).toEqual({page: 1, limit: 10});
    });
});

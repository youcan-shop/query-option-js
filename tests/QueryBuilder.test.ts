import { QueryBuilder } from '../src/QueryBuilder';

describe('Test create from URI', () => {
    it('should correctly parse URI with filters, sort, and pagination', () => {
        const uri = 'http://example.com/api/data?filters[name]=John&filters[age]=30&sort[age]=asc&page=2&limit=10';

        const queryBuilder = QueryBuilder.fromUri(uri);

        expect(queryBuilder.getFilters()).toEqual([{ field: 'name', value: 'John' }, { field: 'age', value: '30' }]);
        expect(queryBuilder.getSort()).toEqual({ age: 'asc' });
        expect(queryBuilder.getPagination()).toEqual({ page: 2, limit: 10 });
    });
});

describe('Test create from URI with no params', () => {
    it('should correctly parse URI with filters, sort, and pagination', () => {
        const uri = 'http://example.com/api/data';

        const queryBuilder = QueryBuilder.fromUri(uri);

        expect(queryBuilder.getFilters()).toEqual([]);
        expect(queryBuilder.getSort()).toEqual({});
        expect(queryBuilder.getPagination()).toEqual({page: 1, limit: 10});
    });
});

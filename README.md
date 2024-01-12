<p align="center">
<img width="150" height="150" src="https://github.com/youcan-shop/QueryOption/blob/main/assets/queryoptionlogo.svg" alt="Query Option package logo"/>
<br><b>QueryOption</b>
</p>

A TypeScript-based tool for constructing and managing query strings in front-end applications. Ideal for handling API requests with filters, sorting, and pagination.

## Features

- Easy construction of query strings with support for filters, sorting, and pagination.
- Ability to initialize from existing URIs.
- Fluent and intuitive API design.

## Installation

To install QueryBuilder, use npm:

```bash
npm install @youcan/query-option
```

## Usage

Below are some examples of how to use QueryBuilder:

````typescript
import { QueryBuilder } from '@youcan/query-option';

const queryBuilder = new QueryBuilder('http://example.com/api/data')
    .setFilters([{ field: 'name', value: 'John', operator: '=' }])
    .setSort({ age: 'asc' })
    .setPagination({ page: 1, limit: 10 });

const queryString = queryBuilder.toString();
console.log(queryString); // Outputs: http://example.com/api/data?name=John&sort[age]=asc&page=1&limit=10
````

## Initializing from URI

````typescript
import { QueryBuilder } from 'your-package-name';

const uri = 'http://example.com/api/data?filters[name]=John&filters[age]=30&sort[age]=asc&page=2&limit=10';
const queryBuilder = QueryBuilder.fromUri('http://example.com/api/data', uri);

console.log(queryBuilder.toString()); // Outputs the same URI
````

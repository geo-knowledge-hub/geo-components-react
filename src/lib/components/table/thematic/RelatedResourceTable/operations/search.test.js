/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { paginateRecordItems } from './search';

describe('Search Operations utilities tests', () => {
  describe('Pagination tests', () => {
    it('should generate a correct pagination object', () => {
      const paginationObject = paginateRecordItems([1, 2, 3, 4, 5, 6], 1, 2);

      expect(Object.keys(paginationObject)).toEqual(
        expect.arrayContaining([
          'currentPage',
          'pageSize',
          'totalItems',
          'totalPages',
          'data',
        ])
      );
    });

    it('should generate a correct number of pages (Simple case)', () => {
      const paginationObject = paginateRecordItems([1, 2, 3, 4, 5, 6], 1, 2);

      expect(paginationObject.totalPages).toEqual(3);
    });

    it('should generate a correct number of pages (Complex case)', () => {
      const paginationObject = paginateRecordItems([1, 2, 3, 4, 5, 6, 7], 1, 2);

      expect(paginationObject.totalPages).toEqual(4);
    });
  });
});

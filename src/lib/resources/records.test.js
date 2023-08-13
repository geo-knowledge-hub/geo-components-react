/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

jest.mock('./api.js');

import recordsApi from '@tests/mock/list/records-api.json';

import { gkhubClient as http } from './api';
import { fetchRecords } from './records';

//
// Constants
//
const CUSTOM_PARAMS = {
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  params: { search: 'test' },
};

//
// Tests
//
describe('Records API (GEO Knowledge Hub)', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    http.get.mockImplementation(() => {
      return Promise.resolve({ data: recordsApi });
    });
  });

  describe('fetchRecords(packages)', () => {
    beforeEach(() => {
      fetchRecords('/api/packages');
    });

    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should call http.get with proper URL', () => {
      expect(http.get).toHaveBeenCalledWith('/api/packages', undefined);
    });

    it('should return a list of 1 record items', async () => {
      const packagesFetched = await fetchRecords('/api/packages');

      expect(packagesFetched).toHaveLength(1);
    });
  });

  describe('fetchRecords(records)', () => {
    beforeEach(() => {
      fetchRecords('/api/records');
    });

    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should call http.get with proper URL', () => {
      expect(http.get).toHaveBeenCalledWith('/api/records', undefined);
    });
  });

  describe('fetchRecords(packages) with params', () => {
    beforeEach(() => {
      fetchRecords('/api/packages', CUSTOM_PARAMS);
    });

    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should call http.get with proper URL', () => {
      expect(http.get).toHaveBeenCalledWith('/api/packages', CUSTOM_PARAMS);
    });
  });
});

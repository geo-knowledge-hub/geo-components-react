/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

jest.mock('./api.js');

import engagementPrioritiesTypes from '../../mocks/vocabularies/engagementprioritiestypes.json';

import { gkhubClient as http } from './api';
import { fetchVocabulary } from './vocabularies';

describe('Vocabulary API (GEO Knowledge Hub)', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchVocabulary', () => {
    beforeEach(() => {
      http.get.mockImplementation(() => {
        return Promise.resolve({ data: engagementPrioritiesTypes });
      });

      fetchVocabulary('engagementprioritiestypes');
    });

    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should call http.get with proper URL', () => {
      expect(http.get).toHaveBeenCalledWith(
        '/api/vocabularies/engagementprioritiestypes',
        { params: undefined }
      );
    });

    it('should return a list of 10 vocabulary items', async () => {
      const engagementPrioritiesFetched = await fetchVocabulary(
        'engagementprioritiestypes'
      );

      expect(engagementPrioritiesFetched).toHaveLength(10);
      expect(engagementPrioritiesFetched[0]).toHaveProperty('id');
    });
  });
});

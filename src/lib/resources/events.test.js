/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

jest.mock('./api.js');

import eventsApiData from '@tests/mock/list/events-api';

import { cmsClient as http } from './api';
import { fetchEvents } from './events';

describe('Events API (CMS)', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchVocabulary', () => {
    beforeEach(() => {
      http.get.mockImplementation(() => {
        return Promise.resolve({ data: eventsApiData });
      });

      fetchEvents();
    });

    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should call http.get with proper URL', () => {
      expect(http.get).toHaveBeenCalledWith('/api/events', undefined);
    });

    it('should return a list of 3 vocabulary items', async () => {
      const eventsFetched = await fetchEvents();

      expect(eventsFetched).toHaveProperty('data');
      expect(eventsFetched).toHaveProperty('meta');

      expect(eventsFetched.data).toHaveLength(3);
      expect(eventsFetched.data[0]).toHaveProperty('id');
    });
  });
});

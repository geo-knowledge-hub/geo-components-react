/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RecordList } from './RecordList';
import { IndexContextProvider } from '../../../IndexContext';

import {
  renderWithCustomContext,
  screen,
} from '../../../../../../../../setupTestRenders';

import relatedRecordsData from '../../../../../../../../mocks/table/table-related-resources.json';

describe('RecordList tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      renderWithCustomContext(<RecordList />, IndexContextProvider, {
        value: {
          searchContext: {
            index: {
              results: relatedRecordsData,
            },
          },
        },
      });

      const recordsLink = screen.getAllByRole('link');
      expect(recordsLink).toHaveLength(24); // record links available in the mock data.
    });
  });
});

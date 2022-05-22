/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { SearchBar } from './SearchBar';

import {
  renderWithCustomContext,
  screen,
} from '../../../../../../setupTestRenders';

import { IndexContextProvider } from '../IndexContext';

describe('Pagionation tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      renderWithCustomContext(<SearchBar />, IndexContextProvider, {
        value: {
          searchContext: {
            searchbar: {
              setContent: (value) => {},
            },
          },
        },
      });

      const searchBarTextboxElement = screen.getByRole('textbox');
      expect(searchBarTextboxElement).toBeInTheDocument();
    });
  });
});

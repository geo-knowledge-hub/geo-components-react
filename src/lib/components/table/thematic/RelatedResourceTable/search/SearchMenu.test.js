/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { SearchMenu } from './SearchMenu';

import {
  renderWithCustomContext,
  screen,
} from '../../../../../../setupTestRenders';

import { IndexContextProvider } from '../IndexContext';

describe('SearchMenu tests', () => {
  describe('Render tests', () => {
    it('should render with the valid props without crashing', () => {
      renderWithCustomContext(
        <SearchMenu data-testid="search-menu" />,
        IndexContextProvider,
        {
          value: {
            searchContext: {
              searchbar: {
                setContent: (value) => {},
              },
            },
          },
        }
      );

      const searchMenuElement = screen.getByTestId('search-menu');
      expect(searchMenuElement).toBeInTheDocument();
    });
  });
});

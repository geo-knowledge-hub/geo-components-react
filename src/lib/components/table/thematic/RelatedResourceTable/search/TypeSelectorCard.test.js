/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { TypeSelectorCard } from './TypeSelectorCard';

import {
  renderWithCustomContext,
  screen,
} from '../../../../../../setupTestRenders';

import { IndexContextProvider } from '../IndexContext';

describe('TypeSelectorCard tests', () => {
  describe('Render tests', () => {
    it('should render with the valid props without crashing', () => {
      renderWithCustomContext(<TypeSelectorCard />, IndexContextProvider, {
        value: {
          resourceTypeMenuContext: {
            recordTypeCount: [
              {
                name: '',
              },
            ],
          },
          searchContext: {
            faceted: {
              resourceType: '',
            },
          },
        },
      });

      const typeSelectorListElement = screen.getByRole('list');
      expect(typeSelectorListElement).toBeInTheDocument();
    });
  });
});

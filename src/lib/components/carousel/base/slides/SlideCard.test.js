/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { SlideCard } from './SlideCard';

import {
  renderWithCarouselProvider,
  screen,
} from '../../../../../setupTestRenders';

describe('SlideCard tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      renderWithCarouselProvider(<SlideCard index={0} />, {
        themeProvider: {
          theme: {
            slides: {
              slideElementClass: 'test-class',
            },
          },
        },
      });

      // checking the generated divs
      const divs = screen.getAllByRole('option');
      expect(divs.length).toBe(1); // 1 (carousel slide)
    });
  });
});

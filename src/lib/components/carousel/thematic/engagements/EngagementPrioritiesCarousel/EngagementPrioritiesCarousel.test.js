/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { EngagementPrioritiesCarousel } from './EngagementPrioritiesCarousel';

import {
  renderWithThemeProvider,
  screen,
} from '../../../../../../setupTestRenders';
import engagementImageItems from '../../../../../../mocks/items/engagement-image-items.json';

describe('EngagementPrioritiesCarousel tests', () => {
  describe('Render tests', () => {

    it('should render with the required props without crashing', () => {
      renderWithThemeProvider(
        <EngagementPrioritiesCarousel
          engagementPriorities={engagementImageItems}
        />,
        {
          themeProvider: {
            theme: {
              slides: {
                headerClass: '',
                slideContainerClass: '',
                slideImageClass: '',
                slideBodyClass: '',
                slideElementClass: '',
              },
            },
          },
        }
      );

      const carouselSlide = screen.getAllByRole('option');
      expect(carouselSlide.length).toBe(engagementImageItems.length);
    });
  });
});

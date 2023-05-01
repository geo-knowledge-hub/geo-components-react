/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

jest.mock('../../../../../resources/api.js');

import React from 'react';

import { http } from '../../../../../resources';

import {
  renderWithThemeProvider,
  screen,
} from '../../../../../../setupTestRenders';

import { EngagementPrioritiesNestedCarousel } from './EngagementPrioritiesNestedCarousel';

import engagementPrioritiesTypesSubtypeFalse from '../../../../../../mocks/vocabularies/engagementprioritiestypes-issubtype-false.json';
import engagementPrioritiesTypesSubtypeTrue from '../../../../../../mocks/vocabularies/engagementprioritiestypes-issubtype-true-subtype-sdg.json';

describe('EngagementPrioritiesNestedCarousel tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      http.get.mockImplementation((url, config) => {
        if (config.params.q === 'props.is_subtype:"false"') {
          return { data: engagementPrioritiesTypesSubtypeFalse };
        }
        return { data: engagementPrioritiesTypesSubtypeTrue };
      });

      renderWithThemeProvider(
        <EngagementPrioritiesNestedCarousel
          nestedCarouselContainerProps={{
            animation: 'scale down',
            direction: 'bottom',
          }}
          nestedCarouselProps={{ visibleSlides: 6 }}
          mainCarouselProps={{ mainCarouselProps: 4 }}
        />,
        {
          themeProvider: {
            theme: {
              carousels: {},
              slides: {},
            },
          },
        }
      );

      const carouseSliders = screen.getAllByRole('listbox');
      expect(carouseSliders.length).toBe(2);
    });
  });
});

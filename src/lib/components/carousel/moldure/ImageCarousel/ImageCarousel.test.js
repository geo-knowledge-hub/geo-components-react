/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { ImageCarousel } from './ImageCarousel';

import {
  renderWithThemeProvider,
  screen,
} from '../../../../../setupTestRenders';
import imageItems from '../../../../../mocks/items/image-items.json';

describe('ImageCarousel tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      renderWithThemeProvider(<ImageCarousel imageItems={imageItems} />, {
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
      });

      // checking the rendered image slide
      const carouselSlide = screen.getAllByRole('option');
      expect(carouselSlide.length).toBe(imageItems.length);
    });
  });
});

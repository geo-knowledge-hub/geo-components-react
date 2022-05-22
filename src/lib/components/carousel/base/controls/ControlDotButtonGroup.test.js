/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { ControlDotButtonGroup } from './ControlDotButtonGroup';

import {
  renderWithCarouselProvider,
  screen,
} from '../../../../../setupTestRenders';

describe('ControlDotButtonGroup tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      const numberOfSlides = 5;

      renderWithCarouselProvider(
        <ControlDotButtonGroup numberOfSlides={numberOfSlides} />
      );

      // buttons
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(numberOfSlides);
    });

    it('should render with required and optional props without crashing', () => {
      const numberOfSlides = 5;

      renderWithCarouselProvider(
        <ControlDotButtonGroup
          numberOfSlides={numberOfSlides}
          basic={true}
          buttonGroupProps={{ 'data-testid': 'test-id' }}
        />
      );

      // divs
      const buttonGroupElement = screen.getByTestId('test-id');
      expect(buttonGroupElement).toBeInTheDocument();
    });
  });
});

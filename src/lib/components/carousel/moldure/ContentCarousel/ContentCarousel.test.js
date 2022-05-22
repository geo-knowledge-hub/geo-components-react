/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { ContentCarousel } from './ContentCarousel';

import { Card } from 'semantic-ui-react';

import {
  renderWithThemeProvider,
  screen,
} from '../../../../../setupTestRenders';

import externalResourceData from '../../../../../mocks/table/table-external-resource-data.json';

describe('ContentCarousel tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      renderWithThemeProvider(
        <ContentCarousel
          contentData={externalResourceData}
          contentGenerator={(content, index, componentTheme) => {
            return (
              <>
                <Card.Content>
                  <Card.Header
                    style={{
                      textAlign: 'center',
                      maxHeight: '60px',
                      fontSize: '14px',
                      color: '#444447',
                    }}
                  >
                    {content.title}
                  </Card.Header>
                </Card.Content>
              </>
            );
          }}
        />,
        {
          themeProvider: {
            theme: {
              slides: {
                headerClass: '',
                slideBodyClass: '',
                slideContainerClass: '',
                slideImageClass: '',
              },
            },
          },
        }
      );

      // checking the rendered image slide
      const carouselSlides = screen.getAllByRole('option');
      expect(carouselSlides.length).toBe(externalResourceData.length);
    });
  });
});

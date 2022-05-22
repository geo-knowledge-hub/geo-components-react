/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

import withMock from 'storybook-addon-mock';

import { EngagementPrioritiesNestedCarousel as EngagementPrioritiesNestedCarouselComponent } from './EngagementPrioritiesNestedCarousel';

import engagementPrioritiesTypesSubtypeFalse from '../../../../../../mocks/vocabularies/engagementprioritiestypes-issubtype-false.json';
import engagementPrioritiesTypesSubtypeTrue from '../../../../../../mocks/vocabularies/engagementprioritiestypes-issubtype-true-subtype-sdg.json';

export default {
  title: 'Carousel/Thematics/Engagement Priorities Carousel',
  component: EngagementPrioritiesNestedCarouselComponent,
  decorators: [withMock],
};

/**
 * Styles
 */
const theme = {
  slides: {
    headerClass: '',
    slideBodyClass: css`
      margin: 5px;
    `,
    slideContainerClass: '',
    slideImageClass: '',
  },
  carousels: {},
};

const CarouselDiv = styled('div')`
  width: 760px;
  height: 300px;
`;

/**
 * Mock API
 */
const mockApiConfig = [
  {
    url: '/api/vocabularies/engagementprioritiestypes?q=&size=',
    method: 'GET',
    status: 200,
    response: (request) => {
      const { searchParams } = request;

      const isSubtype = searchParams.q.indexOf('true') > -1;

      if (isSubtype) {
        return engagementPrioritiesTypesSubtypeTrue;
      }
      return engagementPrioritiesTypesSubtypeFalse;
    },
  },
];

/**
 * Component template
 */
const Template = (args) => (
  <ThemeProvider theme={theme}>
    <CarouselDiv>
      <EngagementPrioritiesNestedCarouselComponent {...args} />
    </CarouselDiv>
  </ThemeProvider>
);

/**
 * Component stories
 */
export const EngagementPrioritiesCarouselNested = Template.bind({});

EngagementPrioritiesCarouselNested.args = {
  nestedCarouselContainerProps: {
    animation: 'scale down',
    direction: 'bottom',
  },
  mainCarouselProps: {
    visibleSlides: 4,
    naturalSlideWidth: 1,
    naturalSlideHeight: 1.25,
  },
  nestedCarouselProps: {
    visibleSlides: 6,
  },
};

EngagementPrioritiesCarouselNested.parameters = {
  mockData: mockApiConfig,
};

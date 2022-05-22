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

import { EngagementPrioritiesCarousel as EngagementPrioritiesCarouselComponent } from './EngagementPrioritiesCarousel';

import engagementImageItems from '../../../../../../mocks/items/engagement-image-items.json';

export default {
  title: 'Carousel/Thematics/Engagement Priorities Carousel',
  component: EngagementPrioritiesCarouselComponent,
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
};

const CarouselDiv = styled('div')`
  width: 300px;
  height: 300px;
`;

/**
 * Component template
 */
const Template = (args) => (
  <ThemeProvider theme={theme}>
    <CarouselDiv>
      <EngagementPrioritiesCarouselComponent {...args} />
    </CarouselDiv>
  </ThemeProvider>
);

/**
 * Component stories
 */
export const EngagementPrioritiesCarouselBasic = Template.bind({});
EngagementPrioritiesCarouselBasic.args = {
  engagementPriorities: engagementImageItems,
  includeHeader: true,
  headerPath: 'title.en',
};

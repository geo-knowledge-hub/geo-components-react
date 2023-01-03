/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { css } from '@emotion/css';
import { ThemeProvider } from '@emotion/react';

import relatedLinkData from '../../../../../../mocks/items/related-link-items.json';
import { RelatedLinkCarousel as RelatedLinkCarouselComponent } from './RelatedLinkCarousel';

export default {
  title: 'Carousel/Thematics/Related Links Carousel',
  component: RelatedLinkCarouselComponent,
};

/**
 * Constants
 */
const theme = {
  slides: {
    slideBodyClass: css`
      margin: 10px;
    `,
  },
};

/**
 * Component template
 */
const Template = (args) => (
  <ThemeProvider theme={theme}>
    <div>
      <RelatedLinkCarouselComponent {...args} />
    </div>
  </ThemeProvider>
);

/**
 * Component stories
 */
export const RelatedLinkCarousel = Template.bind({});
RelatedLinkCarousel.args = {
  relatedLinks: relatedLinkData,
  carouselProviderProps: {
    visibleSlides: 2,
    naturalSlideWidth: 1,
    naturalSlideHeight: 0.55,
    dragEnabled: false,
  },
  cardProps: {
    fluid: true,
    style: {
      minHeight: '200px',
    },
  },
};

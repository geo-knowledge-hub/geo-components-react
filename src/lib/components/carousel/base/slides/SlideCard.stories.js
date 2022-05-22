/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { Segment } from 'semantic-ui-react';
import { ThemeProvider } from '@emotion/react';
import { CarouselProvider } from 'pure-react-carousel';

import { SlideCard } from './SlideCard';

export default {
  title: 'Carousel/Base/Carousel Slide Card',
  component: SlideCard,
};

/**
 * Constants
 */
const slideCardTheme = {
  slides: {
    slideElementClass: '',
  },
};

/**
 * Component template
 */
const Template = (args) => (
  <ThemeProvider theme={slideCardTheme}>
    <CarouselProvider>
      <SlideCard {...args} />
    </CarouselProvider>
  </ThemeProvider>
);

/**
 * Component Stories
 */

// Basic Slide
export const BasicSlide = Template.bind({});
BasicSlide.args = {
  index: 0,
  slideProps: {},
  cardProps: {
    content: (
      <Segment style={{ width: '200px', height: '200px' }}>
        Basic content card example
      </Segment>
    ),
  },
};

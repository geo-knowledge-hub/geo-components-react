/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { ThemeProvider } from '@emotion/react';

import imageItems from '../../../../../mocks/items/image-items.json';
import { ImageCarousel as ImageCarouselComponent } from './ImageCarousel';

export default {
  title: 'Carousel/Moldures/Image Carousel',
  component: ImageCarouselComponent,
};

/**
 * Constants
 */
const theme = {
  slides: {
    headerClass: '',
    slideBodyClass: '',
    slideContainerClass: '',
    slideImageClass: '',
  },
};

/**
 * Component template
 */
const Template = (args) => (
  <ThemeProvider theme={theme}>
    <div style={{ width: '300px' }}>
      <ImageCarouselComponent {...args} />
    </div>
  </ThemeProvider>
);

/**
 * Component stories
 */
export const ImageCarousel = Template.bind({});
ImageCarousel.args = {
  imageItems: imageItems,
  includeHeader: true,
  headerPath: 'title.en',
};

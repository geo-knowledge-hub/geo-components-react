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

import userStoriesData from '../../../../../../mocks/items/user-stories-items.json';
import { UserStoryCarousel as UserStoryCarouselComponent } from './UserStoryCarousel';

export default {
  title: 'Carousel/Thematics/User Story Carousel',
  component: UserStoryCarousel,
};

/**
 * Constants
 */
const theme = {
  slides: {
    slideBodyClass: css`
      margin: 5px;
    `,
  },
};

/**
 * Component template
 */
const Template = (args) => (
  <ThemeProvider theme={theme}>
    <div style={{ width: '650px' }}>
      <UserStoryCarouselComponent {...args} />
    </div>
  </ThemeProvider>
);

/**
 * Component stories
 */
export const UserStoryCarousel = Template.bind({});
UserStoryCarousel.args = {
  userStories: userStoriesData,
  carouselProviderProps: {
    visibleSlides: 2,
    naturalSlideHeight: 1,
  },
};

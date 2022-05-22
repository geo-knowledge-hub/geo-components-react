/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { ThemeProvider } from '@emotion/react';

import { Card } from 'semantic-ui-react';
import { ContentCarousel as ContentCarouselComponent } from './ContentCarousel';

import externalResourceData from '../../../../../mocks/table/table-external-resource-data.json';

export default {
  title: 'Carousel/Moldures/Content Carousel',
  component: ContentCarouselComponent,
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
      <ContentCarouselComponent {...args} />
    </div>
  </ThemeProvider>
);

/**
 * Component stories
 */
export const ContentCarousel = Template.bind({});
ContentCarousel.args = {
  contentData: externalResourceData.slice(0, 10),
  contentGenerator: (content, index, componentTheme) => {
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
  },
};

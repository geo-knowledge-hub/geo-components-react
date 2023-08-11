/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Container } from 'semantic-ui-react';

import { EngagementImages } from './EngagementImages';
import carouselData from '@tests/mock/vocabularies/engagementprioritiestypes-api-raw.json';

//
// Basic configuration
//
export default {
  title: 'Carousel/Thematic/Engagement Images',
  component: EngagementImages,
};

//
// Templates
//
const Template = (args) => (
  <Container className='image-container'>
    <EngagementImages {...args} />
  </Container>
);

//
// Component stories
//
export const Base = Template.bind({});
Base.args = {
  filterUrl: '#',
  engagements: carouselData,
};

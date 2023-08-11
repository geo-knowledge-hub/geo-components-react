/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import withMock from 'storybook-addon-mock';

import { ConventionsCarousel } from './ConventionsCarousel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import conventionsData from '../../../../mocks/vocabularies/engagementprioritiestypes-conventions-true.json';

//
// Basic configuration
//
export default {
  title: 'Carousel/Thematic/Conventions',
  component: ConventionsCarousel,
  decorators: [withMock],
};

//
// Mock API
//
const mockApiConfig = [
  {
    url: '/api/vocabularies/engagementprioritiestypes?q=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return conventionsData;
    },
  },
];

//
// Templates
//
const Template = (args) => (
  <QueryClientProvider client={new QueryClient()}>
    <ConventionsCarousel {...args} />
  </QueryClientProvider>
);

//
// Component stories
//
export const Base = Template.bind({});
Base.args = {
  filterUrl: '#',
};

Base.parameters = {
  mockData: mockApiConfig,
};

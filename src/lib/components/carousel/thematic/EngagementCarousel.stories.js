/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import withMock from 'storybook-addon-mock';

import { EngagementCarousel } from './EngagementCarousel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import engagementPrioritiesTypesSubtypeFalse from '../../../../mocks/vocabularies/engagementprioritiestypes-issubtype-false.json';
import engagementPrioritiesTypesSubtypeTrue from '../../../../mocks/vocabularies/engagementprioritiestypes-issubtype-true-subtype-sdg.json';

//
// Basic configuration
//
export default {
  title: 'Carousel/Thematic/Engagements',
  component: EngagementCarousel,
  decorators: [withMock],
};

//
// Mock API
//
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

//
// Templates
//
const Template = (args) => (
  <QueryClientProvider client={new QueryClient()}>
    <EngagementCarousel {...args} />
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

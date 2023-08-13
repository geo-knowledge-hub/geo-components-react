/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import withMock from 'storybook-addon-mock';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LatestRecords } from './LatestRecords';
import recordsApiData from '../../../../mocks/list/records-api.json';

//
// Basic configuration
//
export default {
  title: 'List/Thematic/Latest Records',
  component: LatestRecords,
  decorators: [withMock],
};

//
// Mock API
//
const mockApiConfig = [
  {
    url: '/api/packages?sort=&size=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return recordsApiData;
    },
  },
];

//
// Templates
//
const Template = (args) => (
  <QueryClientProvider client={new QueryClient()}>
    <LatestRecords {...args} />
  </QueryClientProvider>
);

//
// Component stories
//
export const Base = Template.bind({});
Base.args = {
  fetchUrl: '/api/packages?sort=newest&size=3',
  moreUrl: '#'
};

Base.parameters = {
  mockData: mockApiConfig,
};

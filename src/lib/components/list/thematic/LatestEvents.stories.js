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

import { LatestEvents } from './LatestEvents';
import eventsApiData from '../../../../mocks/list/events-api.json';

//
// Basic configuration
//
export default {
  title: 'List/Thematic/Latest Events',
  component: LatestEvents,
  decorators: [withMock],
};

//
// Mock API
//
const mockApiConfig = [
  {
    url: '/api/events?sort[0]=date',
    method: 'GET',
    status: 200,
    response: (request) => {
      return eventsApiData;
    },
  },
];

//
// Templates
//
const Template = (args) => (
  <QueryClientProvider client={new QueryClient()}>
    <LatestEvents {...args} />
  </QueryClientProvider>
);

//
// Component stories
//
export const Base = Template.bind({});
Base.args = {
  fetchUrl: '/api/events?sort[0]=date',
  moreUrl: 'https://gkhub.earthobservations.org/doc/events',
};

Base.parameters = {
  mockData: mockApiConfig,
};

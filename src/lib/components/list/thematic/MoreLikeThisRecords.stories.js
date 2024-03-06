/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MoreLikeThisRecords } from './MoreLikeThisRecords';
import recordsApiData from '../../../../mocks/list/records-api.json';

//
// Basic configuration
//
export default {
  title: 'List/Thematic/More Like This Records',
  component: MoreLikeThisRecords,
};

//
// Templates
//
const Template = (args) => (
  <QueryClientProvider client={new QueryClient()}>
    <MoreLikeThisRecords {...args} />
  </QueryClientProvider>
);

//
// Component stories
//
export const Base = Template.bind({});
Base.args = {
  records: recordsApiData.hits.hits,
};

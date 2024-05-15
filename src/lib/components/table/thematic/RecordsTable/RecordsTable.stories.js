/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RecordsTable as RecordsTableComponent } from './RecordsTable';

import recordsApiData from '../../../../../mocks/list/records-api.json';

export default {
  title: 'Table/Thematic/Records table',
  component: RecordsTableComponent,
};

/**
 * Component template
 */
const Template = (args) => <RecordsTableComponent {...args} />;

/**
 * Component stories
 */
export const Base = Template.bind({});
Base.args = {
  tableData: recordsApiData.hits.hits,
};

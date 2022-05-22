/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { ExternalResourceTable as ExternalResourceTableComponent } from './ExternalResourceTable';

import externalResourceData from '../../../../../mocks/table/table-external-resource-data.json';

export default {
  title: 'Table/Thematic/External Resource Table',
  component: ExternalResourceTableComponent,
};

/**
 * Component template
 */
const Template = (args) => <ExternalResourceTableComponent {...args} />;

/**
 * Component stories
 */
export const ExternalResourceTable = Template.bind({});
ExternalResourceTable.args = {
  tableData: externalResourceData,
};

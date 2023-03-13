/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RelatedPackagesTable as RelatedPackagesTableComponent } from './RelatedPackagesTable';

import data from '../../../../../mocks/table/table-related-packages-data.json';

export default {
  title: 'Table/Thematic/Related Packages table',
  component: RelatedPackagesTableComponent,
};

/**
 * Component template
 */
const Template = (args) => <RelatedPackagesTableComponent {...args} />;

/**
 * Component stories
 */
export const RelatedPackagesTable = Template.bind({});
RelatedPackagesTable.args = {
  tableData: data,
};

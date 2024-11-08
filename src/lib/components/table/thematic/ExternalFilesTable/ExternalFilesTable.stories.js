/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { ExternalFilesTable as ExternalFilesTableComponent } from './ExternalFilesTable';

import externalFilesData from '../../../../../mocks/table/table-external-files.json';

export default {
  title: 'Table/Thematic/External Files Table',
  component: ExternalFilesTableComponent,
};

/**
 * Component template
 */
const Template = (args) => <ExternalFilesTableComponent {...args} />;

/**
 * Component stories
 */
export const Base = Template.bind({});
Base.args = {
  tableData: externalFilesData,
};

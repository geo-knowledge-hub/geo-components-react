/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RelatedResourceTable as RelatedResourceTableComponent } from './RelatedResourceTable';

import resourceTypeData from '../../../../../mocks/vocabularies/resourcetypes.json';
import relatedRecordsData from '../../../../../mocks/table/table-related-resources.json';

export default {
  title: 'Table/Thematic/Related Resource Table',
  component: RelatedResourceTableComponent,
};

/**
 * Component template
 */
const Template = (args) => <RelatedResourceTableComponent {...args} />;

/**
 * Component stories
 */
export const Base = Template.bind({});
Base.args = {
  records: relatedRecordsData,
  resourceTypeDefinitions: resourceTypeData,
};

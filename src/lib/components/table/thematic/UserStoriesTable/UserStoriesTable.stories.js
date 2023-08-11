/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { UserStoriesTable } from './UserStoriesTable';

import data from '../../../../../mocks/table/table-user-stories.json';

export default {
  title: 'Table/Thematic/Users stories table',
  component: UserStoriesTable,
};

/**
 * Component template
 */
const Template = (args) => <UserStoriesTable {...args} />;

/**
 * Component stories
 */
export const Base = Template.bind({});
Base.args = {
  tableData: data,
};

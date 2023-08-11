/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { UserStoriesTable } from './UserStoriesTable';

import { render } from '../../../../../setupTestRenders';

import data from '../../../../../mocks/table/table-user-stories.json';

describe('UserStoriesTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(<UserStoriesTable tableData={data} />);
    });
  });
});

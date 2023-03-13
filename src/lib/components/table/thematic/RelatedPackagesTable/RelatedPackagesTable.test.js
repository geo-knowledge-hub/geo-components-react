/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RelatedPackagesTable } from './RelatedPackagesTable';

import { render } from '../../../../../setupTestRenders';

import tableData from '../../../../../mocks/table/table-related-packages-data.json';

describe('RelatedPackagesTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(<RelatedPackagesTable tableData={tableData} />);
    });
  });
});

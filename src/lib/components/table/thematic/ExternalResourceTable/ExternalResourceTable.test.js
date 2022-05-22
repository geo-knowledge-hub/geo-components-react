/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { ExternalResourceTable } from './ExternalResourceTable';

import { render } from '../../../../../setupTestRenders';

import tableDatExternalResource from '../../../../../mocks/table/table-external-resource-data.json';

describe('ExternalResourceTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(<ExternalResourceTable tableData={tableDatExternalResource} />);
    });
  });
});

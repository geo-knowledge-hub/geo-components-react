/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { ExternalFilesTable } from './ExternalFilesTable';

import { render } from '../../../../../setupTestRenders';

import externalFilesData from '../../../../../mocks/table/table-external-files.json';

describe('ExternalFilesTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(<ExternalFilesTable tableData={externalFilesData} />);
    });
  });
});

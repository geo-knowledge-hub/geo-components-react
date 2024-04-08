/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RecordsTable } from './RecordsTable';

import { render } from '../../../../../setupTestRenders';

import recordsApiData from '../../../../../mocks/list/records-api.json';

describe('RecordsTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(<RecordsTable tableData={recordsApiData.hits.hits} />);
    });
  });
});

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { renderWithQueryContext } from '.@tests/renders';

import { LatestRecords } from './LatestRecords';

describe('LatestRecords tests', () => {
  describe('Render tests', () => {
    it('should render without errors', () => {
      renderWithQueryContext(<LatestRecords fetchUrl="#" />);
    });
  });
});

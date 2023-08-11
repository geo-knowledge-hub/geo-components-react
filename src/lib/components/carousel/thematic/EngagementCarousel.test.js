/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { renderWithQueryContext } from '.@tests/renders';

import { EngagementCarousel } from './EngagementCarousel';

describe('EngagementCarousel tests', () => {
  describe('Render tests', () => {
    it('should render without errors', () => {
      renderWithQueryContext(<EngagementCarousel filterUrl="#" />);
    });
  });
});

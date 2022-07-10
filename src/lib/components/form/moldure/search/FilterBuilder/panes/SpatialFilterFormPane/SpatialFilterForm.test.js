/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { SpatialFilterForm } from './SpatialFilterForm';
import { renderWithFormikProvider } from '@tests/renders';

describe('SpatialFilterForm tests', () => {
  describe('Render tests', () => {
    it('should render without crashing', () => {
      renderWithFormikProvider(<SpatialFilterForm />);
    });
    it('should render with props without crashing', () => {
      renderWithFormikProvider(
        <>
          <SpatialFilterForm
            mapConfig={{
              mapContainer: {
                center: [34, -52],
                zoom: 10,
              },
            }}
          />
        </>
      );
    });
  });
});

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { AdvancedFilterModal } from './AdvancedFilterModal';
import { render } from '@tests/renders';

describe('AdvancedFilterModal tests', () => {
  describe('Render tests', () => {
    it('should render without crashing', () => {
      render(
        <>
          <AdvancedFilterModal formOnApplyFilter={(values) => {}} />
        </>
      );
    });
  });
});

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { PricingPlansTable } from './PricingPlansTable';

import { render } from '../../../../../setupTestRenders';

import tableDataPricingPlans from '../../../../../mocks/table/table-pricing-plans.json';

describe('PricingPlansTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(<PricingPlansTable tableData={tableDataPricingPlans} />);
    });
  });
});

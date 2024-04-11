/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { PricingPlansTable as PricingPlansTableComponent } from './PricingPlansTable';

import tableDataPricingPlans from '../../../../../mocks/table/table-pricing-plans.json';

export default {
  title: 'Table/Thematic/Pricing Plans Table',
  component: PricingPlansTableComponent,
};

/**
 * Component template
 */
const Template = (args) => <PricingPlansTableComponent {...args} />;

/**
 * Component stories
 */
export const Base = Template.bind({});
Base.args = {
  tableData: tableDataPricingPlans,
};

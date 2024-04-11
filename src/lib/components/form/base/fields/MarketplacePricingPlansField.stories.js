/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Formik } from 'formik';

import { MarketplacePricingPlansField as MarketplacePricingPlansComponent } from './MarketplacePricingPlansField';

export default {
  title: 'Form/Fields/Marketplace Pricing Plans',
  component: MarketplacePricingPlansComponent,
};

/**
 * Component template
 */
const Template = (args) => (
  <>
    <Formik initialValues={{}}>
      <MarketplacePricingPlansComponent {...args} />
    </Formik>
  </>
);

/**
 * Component stories
 */
export const Base = Template.bind({});
Base.args = {};

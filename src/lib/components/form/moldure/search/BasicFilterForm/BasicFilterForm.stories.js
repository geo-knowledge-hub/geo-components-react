/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Formik } from 'formik';

import { BasicFilterForm as BasicFilterFormComponent } from './BasicFilterForm';

export default {
  title: 'Form/Search/Basic Filter form',
  component: BasicFilterFormComponent,
};

/**
 * Component template
 */
const Template = (args) => (
  <>
    <Formik initialValues={{}}>
      <BasicFilterFormComponent {...args} />
    </Formik>
  </>
);

/**
 * Component stories
 */
export const Basic = Template.bind({});
Basic.args = {};

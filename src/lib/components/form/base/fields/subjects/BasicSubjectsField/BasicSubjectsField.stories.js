/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Formik } from 'formik';
import withMock from 'storybook-addon-mock';

import subjectsApiData from '@tests/mock/vocabularies/subjects-api.json';
import { BasicSubjectsField as BasicSubjectsFieldComponent } from './BasicSubjectsField';

export default {
  title: 'Form/Fields/Basic Subjects field',
  component: BasicSubjectsFieldComponent,
  decorators: [withMock],
};

/**
 * Mock API
 */
const mockApiConfig = [
  {
    url: '/api/vocabularies/subjects?size=&suggest=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return subjectsApiData;
    },
  },
];

/**
 * Component template
 */
const Template = (args) => (
  <>
    <Formik initialValues={{}}>
      <BasicSubjectsFieldComponent {...args} />
    </Formik>
  </>
);

/**
 * Component stories
 */
export const Basic = Template.bind({});
Basic.args = {};

Basic.parameters = {
  mockData: mockApiConfig,
};

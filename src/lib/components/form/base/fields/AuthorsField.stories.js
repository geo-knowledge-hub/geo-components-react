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

import namesApiData from '@tests/mock/vocabularies/names-api.json';

import { AuthorsField as AuthorsFieldComponent } from './AuthorsField';

export default {
  title: 'Form/Fields/Authors field',
  component: AuthorsFieldComponent,
  decorators: [withMock],
};

/**
 * Mock API
 */
const mockApiConfig = [
  {
    url: '/api/names?size=&suggest=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return namesApiData;
    },
  },
];

/**
 * Component template
 */
const Template = (args) => (
  <>
    <Formik initialValues={{}}>
      <AuthorsFieldComponent {...args} />
    </Formik>
  </>
);

/**
 * Component stories
 */
export const Base = Template.bind({});
Base.args = {};

Base.parameters = {
  mockData: mockApiConfig,
};

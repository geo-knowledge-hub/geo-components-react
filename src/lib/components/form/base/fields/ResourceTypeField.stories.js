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

import resourceTypesApiData from '@tests/mock/vocabularies/resourcetypes-api.json';
import { ResourceTypeField as ResourceTypeFieldComponent } from './ResourceTypeField';

export default {
  title: 'Form/Fields/Resource Type field',
  component: ResourceTypeFieldComponent,
  decorators: [withMock],
};

/**
 * Mock API
 */
const mockApiConfig = [
  {
    url: '/api/vocabularies/resourcetypes?size=&suggest=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return resourceTypesApiData;
    },
  },
];

/**
 * Component template
 */
const Template = (args) => (
  <>
    <Formik initialValues={{}}>
      <ResourceTypeFieldComponent {...args} />
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

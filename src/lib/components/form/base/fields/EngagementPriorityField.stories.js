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

import engagementPrioritiesApiData from '@tests/mock/vocabularies/engagementprioritiestypes-api.json';
import { EngagementPriorityField as EngagementPriorityFieldComponent } from './EngagementPriorityField';

export default {
  title: 'Form/Fields/Engagement Priority field',
  component: EngagementPriorityFieldComponent,
  decorators: [withMock],
};

/**
 * Mock API
 */
const mockApiConfig = [
  {
    url: '/api/vocabularies/engagementprioritiestypes?size=&suggest=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return engagementPrioritiesApiData;
    },
  },
];

/**
 * Component template
 */
const Template = (args) => (
  <>
    <Formik initialValues={{}}>
      <EngagementPriorityFieldComponent {...args} />
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

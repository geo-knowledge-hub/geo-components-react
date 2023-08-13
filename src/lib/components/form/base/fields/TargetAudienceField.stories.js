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

import targetAudiencesApiData from '@tests/mock/vocabularies/targetaudiencestypes-api.json';
import { TargetAudienceField as TargetAudienceFieldComponent } from './TargetAudienceField';

export default {
  title: 'Form/Fields/Target Audiences field',
  component: TargetAudienceFieldComponent,
  decorators: [withMock],
};

/**
 * Mock API
 */
const mockApiConfig = [
  {
    url: '/api/vocabularies/targetaudiencestypes?size=&suggest=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return targetAudiencesApiData;
    },
  },
];

/**
 * Component template
 */
const Template = (args) => (
  <>
    <Formik initialValues={{}}>
      <TargetAudienceFieldComponent {...args} />
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

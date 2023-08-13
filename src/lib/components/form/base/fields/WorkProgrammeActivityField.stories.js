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

import programmeActivityApiData from '@tests/mock/vocabularies/programmeactivities-api.json';
import { WorkProgrammeActivityField as WorkProgrammeActivityFieldComponent } from './WorkProgrammeActivityField';

export default {
  title: 'Form/Fields/Programme Activity field',
  component: WorkProgrammeActivityFieldComponent,
  decorators: [withMock],
};

/**
 * Mock API
 */
const mockApiConfig = [
  {
    url: '/api/vocabularies/geowptypes?size=&suggest=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return programmeActivityApiData;
    },
  },
];

/**
 * Component template
 */
const Template = (args) => (
  <>
    <Formik initialValues={{}}>
      <WorkProgrammeActivityFieldComponent {...args} />
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

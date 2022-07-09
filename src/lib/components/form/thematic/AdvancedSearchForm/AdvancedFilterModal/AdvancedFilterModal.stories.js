/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import withMock from 'storybook-addon-mock';

import { Formik } from 'formik';
import { Button } from 'semantic-ui-react';

import { Global } from '@emotion/react';

import subjectsApiData from '@tests/mock/vocabularies/subjects-api.json';
import resourceTypesApiData from '@tests/mock/vocabularies/resourcetypes-api.json';
import namesApiData from '@tests/mock/vocabularies/names-api.json';

import { AdvancedFilterModal as AdvancedFilterModalComponent } from './AdvancedFilterModal';

export default {
  title: 'Form/Search/Advanced filter modal',
  component: AdvancedFilterModalComponent,
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
  {
    url: '/api/vocabularies/resourcetypes?size=&suggest=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return resourceTypesApiData;
    },
  },
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
    <Global
      styles={{
        '.leaflet-container': {
          height: '40vh',
          zIndex: 0,
        },
      }}
    />

    <Formik initialValues={{}}>
      <AdvancedFilterModalComponent {...args} />
    </Formik>
  </>
);

/**
 * Component stories
 */
export const Basic = Template.bind({});
Basic.args = {
  modalTrigger: <Button content={'Open modal'} />,
  formOnApplyFilter: (values) => {
    console.log('User defined values');
    console.log(values);
  },
};

Basic.parameters = {
  mockData: mockApiConfig,
};

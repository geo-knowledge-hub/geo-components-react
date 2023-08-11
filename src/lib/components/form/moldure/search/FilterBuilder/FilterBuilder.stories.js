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

import subjectsApiData from '@tests/mock/vocabularies/subjects-api.json';
import resourceTypesApiData from '@tests/mock/vocabularies/resourcetypes-api.json';
import namesApiData from '@tests/mock/vocabularies/names-api.json';
import programmeActivityApiData from '@tests/mock/vocabularies/programmeactivities-api.json';
import targetAudiencesApiData from '@tests/mock/vocabularies/targetaudiencestypes-api.json';
import engagementPrioritiesApiData from '@tests/mock/vocabularies/engagementprioritiestypes-api.json';

import { FilterBuilder as FilterBuilderComponent } from './FilterBuilder';

export default {
  title: 'Form/Search/Filter builder',
  component: FilterBuilderComponent,
  decorators: [withMock],
};

/**
 * Mock API
 */
const mockApiConfig = [
  {
    url: '/api/subjects?size=&suggest=',
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
  {
    url: '/api/vocabularies/geowptypes?size=&suggest=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return programmeActivityApiData;
    },
  },
  {
    url: '/api/vocabularies/targetaudiencestypes?size=&suggest=',
    method: 'GET',
    status: 200,
    response: (request) => {
      return targetAudiencesApiData;
    },
  },
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
      <FilterBuilderComponent {...args} />
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

export const BasicWithDefaultValues = Template.bind({});
BasicWithDefaultValues.args = {
  modalTrigger: <Button content={'Open modal'} />,
  formOnApplyFilter: (values) => {
    console.log('User defined values');
    console.log(values);
  },
  formInitialValues: {
    form: {
      resourceTypes: [
        {
          id: 'knowledge',
          key: 'knowledge',
          text: 'Knowledge Package',
          value: 'knowledge',
        },
      ],
    },
  },
};

BasicWithDefaultValues.parameters = {
  mockData: mockApiConfig,
};

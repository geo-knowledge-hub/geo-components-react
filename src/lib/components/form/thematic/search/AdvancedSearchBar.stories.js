/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import withMock from 'storybook-addon-mock';

import { AdvancedSearchBar as AdvancedSearchBarComponent } from './AdvancedSearchBar';

import subjectsApiData from '@tests/mock/vocabularies/subjects-api.json';
import resourceTypesApiData from '@tests/mock/vocabularies/resourcetypes-api.json';
import namesApiData from '@tests/mock/vocabularies/names-api.json';
import programmeActivityApiData from '@tests/mock/vocabularies/programmeactivities-api.json';
import targetAudiencesApiData from '@tests/mock/vocabularies/targetaudiencestypes-api.json';
import engagementPrioritiesApiData from '@tests/mock/vocabularies/engagementprioritiestypes-api.json';
import { Button } from 'semantic-ui-react';

export default {
  title: 'Form/Search/Advanced search bar',
  component: AdvancedSearchBarComponent,
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
    <AdvancedSearchBarComponent {...args} />
  </>
);

/**
 * Component stories
 */
export const Base = Template.bind({});
Base.args = {
  placeholder: 'Search for something',
  onSearch: (queryObject) => {
    console.log(queryObject);
  },
};

Base.parameters = {
  mockData: mockApiConfig,
};

export const BaseWithDefaultValues = Template.bind({});
BaseWithDefaultValues.args = {
  placeholder: 'Search for something',
  onSearch: (queryObject) => {
    console.log(queryObject);
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

BaseWithDefaultValues.parameters = {
  mockData: mockApiConfig,
};

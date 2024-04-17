/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import qs from 'qs';
import _isEmpty from 'lodash/isEmpty';

import { Formik, Field } from 'formik';
import { Button, Input, Form, Icon } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

import { FilterBuilder } from '../../moldure';

/**
 * Advanced search bar component.
 * @constructor
 *
 * @param {String} searchPlaceholder Search placeholder.
 * @param {Function} onSearch Function to be called when user click to perform the search.
 * @param {Object} formInitialValues initial values for the search component.
 * @param {Object} filterBuilderProps Configurations for the ``FilterBuilder`` component.
 *
 * @todo
 *  - Review the structure to create a more simple implementation.
 *
 * @returns {JSX.Element}
 */
export const AdvancedSearchBar = ({
  searchPlaceholder,
  onSearch,
  formInitialValues,
  ...filterBuilderProps
}) => {
  // States
  const [extraFilters, setExtraFilters] = useState({
    queryDefinition: {
      searchQueryArgs: {
        name: 'q',
      },
      searchExtraParams: {},
    },
    queryFormValues: formInitialValues,
  });

  // Auxiliary functions
  const onSubmitFnc = (formikValues) => {
    const { searchQueryArgs, searchExtraParams } = extraFilters.queryDefinition;

    // Checking the query string arguments.
    // ToDo: Simplify the structure.
    if (!_isEmpty(searchQueryArgs.value) && !_isEmpty(formikValues.q)) {
      searchQueryArgs.value = `${formikValues.q} AND ${searchQueryArgs.value}`;
    } else if (_isEmpty(searchQueryArgs.value) && !_isEmpty(formikValues.q)) {
      searchQueryArgs.value = formikValues.q;
    } else if (_isEmpty(searchQueryArgs.value)) {
      searchQueryArgs.value = '';
    }

    // Checking the parameters
    searchExtraParams.value = searchExtraParams.value || {};

    // Creating the `qs` object
    const queryObject = {
      [searchQueryArgs.name]: searchQueryArgs.value,
      ...searchExtraParams.value,
    };

    // Create the query string.
    const queryString = qs.stringify(queryObject, {
      arrayFormat: 'repeat',
    });

    onSearch(queryString);
  };

  return (
    <Formik
      initialValues={{
        q: '',
      }}
      onSubmit={(formikValues, formikHelpers) => {}}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Input size={'big'} type={'text'} fluid action>
            <Field
              type={'text'}
              name={'q'}
              placeholder={searchPlaceholder}
              className={'form-control search-bar-form'}
            />

            <FilterBuilder
              modalTrigger={
                <Button icon as={'a'}>
                  <Icon name={'filter'} />
                </Button>
              }
              formOnApplyFilter={(formValues, queryValue) => {
                setExtraFilters({
                  queryDefinition: queryValue,
                  queryFormValues: formValues,
                });
              }}
              formInitialValues={extraFilters.queryFormValues}
              {...filterBuilderProps}
            />
            <Button
              icon
              type={'submit'}
              className={'search'}
              onClick={() => onSubmitFnc(values)}
            >
              <Icon name={'search'} />
            </Button>
          </Input>
        </Form>
      )}
    </Formik>
  );
};

AdvancedSearchBar.propTypes = {
  searchPlaceholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

AdvancedSearchBar.defaultProps = {
  searchPlaceholder: i18next.t('Search'),
};

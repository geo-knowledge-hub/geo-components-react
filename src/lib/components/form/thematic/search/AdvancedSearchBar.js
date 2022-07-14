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

import { Formik, Form, Field } from 'formik';
import { Button, Input, Icon } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

import { FilterBuilder } from '../../moldure';

/**
 * Advanced search bar component.
 * @constructor
 *
 * @param {String} searchPlaceholder Search placeholder.
 * @param {Function} onSearch Function to be called when user click to perform the search.
 * @returns {JSX.Element}
 */
export const AdvancedSearchBar = ({ searchPlaceholder, onSearch }) => {
  const [extraFilters, setExtraFilters] = useState({
    queryDefinition: {},
    queryFormValues: {},
  });

  return (
    <Formik
      initialValues={{
        q: '',
      }}
      onSubmit={(formikValues) => {
        const { searchQueryArgs, searchExtraParams } =
          extraFilters.queryDefinition;

        // Checking the query string arguments.
        // ToDo: Refactor to simplify the structure.
        if (!_isEmpty(searchQueryArgs.value) && !_isEmpty(formikValues.q)) {
          searchQueryArgs.value = `${formikValues.q} AND ${searchQueryArgs.value}`;
        } else if (
          _isEmpty(searchQueryArgs.value) &&
          !_isEmpty(formikValues.q)
        ) {
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
      }}
    >
      <Form>
        <Input type={'text'} fluid big action>
          <Field type={'text'} name={'q'} placeholder={searchPlaceholder} />

          <FilterBuilder
            modalTrigger={
              <Button icon>
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
          />
          <Button icon type={'submit'}>
            <Icon name={'search'} />
          </Button>
        </Input>
      </Form>
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

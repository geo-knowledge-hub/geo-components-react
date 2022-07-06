/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import PropTypes from 'prop-types';
import { VocabularySuggestionField } from './VocabularySuggestionField';

import { i18next } from '@translations/i18next';

/**
 * Resource Type field.
 * @constructor
 *
 * @param {String} fieldPath Path where the field data will be stored in the Formik data.
 * @param {Object} fieldProps (Spread) Extra parameters for the `VocabularySuggestionField`.
 */
export const ResourceTypeField = ({ fieldPath, ...fieldProps }) => {
  return (
    <VocabularySuggestionField
      fieldPath={fieldPath}
      suggestionAPIUrl="/api/vocabularies/resourcetypes"
      {...fieldProps}
    />
  );
};

ResourceTypeField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
};

ResourceTypeField.defaultProps = {
  fieldPath: 'metadata.resource_type',
  label: i18next.t('Resource type'),
  labelIcon: 'tag',
  placeholder: i18next.t('Search for a Resource Type'),
  noQueryMessage: i18next.t('Start typing to search for a Resource Type'),
};

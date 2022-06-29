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
 * @name TargetAudienceField
 * @summary Target Audience Selection Formik Field.
 *
 * @note This component is based on `LanguagesField` provided by
 *       the `react-invenio-deposit` library.
 */
export const TargetAudienceField = ({ fieldPath, ...fieldProps }) => {
  return (
    <VocabularySuggestionField
      fieldPath={fieldPath}
      suggestionAPIUrl="/api/vocabularies/targetaudiencestypes"
      {...fieldProps}
    />
  );
};

TargetAudienceField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  serializeSuggestions: PropTypes.func,
};

TargetAudienceField.defaultProps = {
  fieldPath: 'metadata.target_audiences',
  label: 'Target Audiences',
  labelIcon: 'users',
  multiple: true,
  clearable: true,
  required: true,
  placeholder: 'Search for Target Audiences',
  noQueryMessage: 'Start typing to search for Target Audience',
};

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
 * @nameWorkProgrammeActivityField
 * @summary Engagement Priority Formik Field.
 *
 * @note This component is based on `LanguagesField` provided by
 *       the `react-invenio-deposit` library.
 */
export const WorkProgrammeActivityField = ({ fieldPath, ...fieldProps }) => {
  return (
    <VocabularySuggestionField
      multiple={false}
      fieldPath={fieldPath}
      suggestionAPIUrl="/api/vocabularies/geowptypes"
      {...fieldProps}
    />
  );
};

WorkProgrammeActivityField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  required: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  serializeSuggestions: PropTypes.func,
};

WorkProgrammeActivityField.defaultProps = {
  fieldPath: 'metadata.geo_work_programme_activity',
  label: 'GEO Work Programme Activity',
  labelIcon: 'globe',
  clearable: true,
  required: true,
  placeholder: 'Search for a GEO Work Programme Activity',
  noQueryMessage: 'Start typing to search for a GEO Work Programme Activity',
};

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FieldLabel, RemoteSelectField } from 'react-invenio-forms';

/**
 * Base vocabulary suggestion Formik field.
 *
 * This field allows users to select on or more values from a list
 * based on a controlled vocabulary in a server.
 *
 * @param {String} fieldPath Path where the field data will be stored in the Formik data.
 * @param {String} label Field Label
 * @param {String} labelIcon Field icon
 * @param {Object} fieldProps (Spread) Extra parameters for the `RemoteSelectField`.
 *
 * @note This component is based on `LanguagesField` provided by
 *       the `react-invenio-deposit` library.
 */
export const VocabularySuggestionField = ({
  fieldPath,
  label,
  labelIcon,
  ...fieldProps
}) => {
  return (
    <RemoteSelectField
      fieldPath={fieldPath}
      suggestionAPIHeaders={{
        Accept: 'application/vnd.inveniordm.v1+json',
      }}
      label={<FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />}
      serializeSuggestions={(data) => {
        return data.map((obj) => ({
          key: obj.id,
          value: obj.id,
          text: obj.title_l10n, // returned by default in the vocabularies when `vnd.inveniordm` is used.
        }));
      }}
      {...fieldProps}
    />
  );
};

VocabularySuggestionField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelIcon: PropTypes.string.isRequired,
};

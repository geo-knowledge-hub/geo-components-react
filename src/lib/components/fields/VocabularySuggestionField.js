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

import { i18next } from '@translations/i18next';

/**
 * @name VocabularySuggestionField
 * @summary Base class for Formik Fields based on Vucabulary Suggestion.
 *
 * @description This field allow users to select on or more values from a list
 *              based on a controlled vocabularty in the server.
 *
 * @note This component is based on `LanguagesField` provided by
 *       the `react-invenio-deposit` library.
 */
export const VocabularySuggestionField = ({
  fieldPath,
  label,
  labelIcon,
  required,
  multiple,
  placeholder,
  clearable,
  suggestionAPIUrl,
  ...fieldProps
}) => {
  return (
    <RemoteSelectField
      fieldPath={fieldPath}
      suggestionAPIUrl={suggestionAPIUrl}
      suggestionAPIHeaders={{
        Accept: 'application/vnd.inveniordm.v1+json',
      }}
      placeholder={placeholder}
      required={required}
      clearable={clearable}
      multiple={multiple}
      label={<FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />}
      serializeSuggestions={(data) => {
        return data.map((obj) => ({
          key: obj.id,
          value: obj.id,
          text: obj.title_l10n,
        }));
      }}
      {...fieldProps}
    />
  );
};

VocabularySuggestionField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.object,
};

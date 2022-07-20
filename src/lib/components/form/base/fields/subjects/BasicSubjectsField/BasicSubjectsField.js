/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Field, getIn } from 'formik';

import { VocabularySuggestionField } from '../../VocabularySuggestionField';

import { i18next } from '@translations/i18next';

/**
 *  Basic Subject Formik field.
 * @constructor
 *
 * @param {String} fieldPath Path where the field data will be stored in the Formik data.
 * @param {Object} fieldProps (Spread) Extra parameters for the `VocabularySuggestionField`.
 */
export const BasicSubjectsField = ({ fieldPath, ...fieldProps }) => {
  return (
    <Field name={fieldPath}>
      {({ form: { values } }) => {
        return (
          <VocabularySuggestionField
            fieldPath={fieldPath}
            multiple={true} // We are using `value` array. So, this option must be `true`.
            allowAdditions={true}
            suggestionAPIUrl="/api/subjects"
            suggestionAPIHeaders={{
              Accept: 'application/json',
            }}
            serializeAddedValue={(value) => ({
              text: value,
              value: value,
              key: value,
            })}
            serializeSuggestions={(data) => {
              return data.map((obj) => ({
                key: obj.id || obj.key,
                value: obj.subject || obj.value,
                text: obj.subject || obj.text, // todo: change to localization string (l10n) when available.
              }));
            }}
            onValueChange={({ formikProps }, selectedSuggestions) => {
              formikProps.form.setFieldValue(
                fieldPath,
                // save the suggestion objects so we can extract information
                // about which value added by the user
                selectedSuggestions
              );
            }}
            value={getIn(values, fieldPath, []).map((val) => val.value)}
            initialSuggestions={getIn(values, fieldPath, [])}
            {...fieldProps}
          />
        );
      }}
    </Field>
  );
};

BasicSubjectsField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  placeholder: PropTypes.string,
  noQueryMessage: PropTypes.string,
  allowAdditions: PropTypes.bool,
};

BasicSubjectsField.defaultProps = {
  fieldPath: 'metadata.subjects',
  label: i18next.t('Subjects'),
  labelIcon: 'tag',
  placeholder: i18next.t('Search for a Subject'),
  noQueryMessage: i18next.t('Start typing to search for a Subject'),
};

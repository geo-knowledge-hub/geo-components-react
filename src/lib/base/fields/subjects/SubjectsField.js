/*
 * This file is part of GEO-Labels-React.
 * Copyright (C) 2022 CERN.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Labels-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _set from 'lodash/set';
import _first from 'lodash/first';

import { Field, getIn } from 'formik';

import { Form } from 'semantic-ui-react';
import { FieldLabel, GroupField, RemoteSelectField } from 'react-invenio-forms';

/**
 * Subject field for the GEO Knowledge Hub forms.
 *
 * Component to add support for the Subjects field in the
 * GEO Knowledge Hub forms.
 *
 * Note: This is a temporary implementation, based on the
 * React Invenio Deposit.
 */
export class SubjectsField extends Component {
  state = {
    limitTo: 'FOS', // temporary
  };

  serializeSubjects = (subjects) =>
    subjects.map((subject) => {
      const scheme = subject.scheme ? `(${subject.scheme}) ` : '';
      return {
        text: scheme + subject.subject,
        value: subject.subject,
        key: subject.subject,
        subject: subject.subject,
        ...(subject.id ? { id: subject.id } : {}),
        ...(subject.scheme ? { scheme: subject.scheme } : { scheme: 'custom' }),
      };
    });

  prepareSuggest = (searchQuery) => {
    const limitTo = this.state.limitTo;
    const prefix = limitTo === 'all' ? '' : `${limitTo}:`;
    return `${prefix}${searchQuery}`;
  };

  transformIntoInitialValues = (values) => {
    return values.map((val) => {
      let newValue = val;

      if (val.id) {
        newValue =
          _first(
            this.props.initialValues.filter(
              (initialVal) => initialVal.id === val.id
            )
          ) || val;
      }
      return newValue;
    });
  };

  render() {
    const {
      fieldPath,
      label,
      labelIcon,
      required,
      multiple,
      placeholder,
      clearable,
      limitToOptions,
      initialValues,
    } = this.props;

    return (
      <GroupField>
        <Form.Field width={5}>
          <FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />
          <GroupField>
            <Form.Field
              width={7}
              style={{ marginBottom: 'auto', marginTop: 'auto' }}
            >
              {'Suggest from'}
            </Form.Field>
            <Form.Dropdown
              defaultValue={limitToOptions[0].value}
              fluid
              onChange={(event, data) => this.setState({ limitTo: data.value })}
              options={limitToOptions}
              selection
              width={8}
            />
          </GroupField>
        </Form.Field>
        <Field name={this.props.fieldPath}>
          {({ form: { values } }) => {
            return (
              <RemoteSelectField
                clearable={clearable}
                fieldPath={fieldPath}
                initialSuggestions={initialValues.filter((suggestion) =>
                  suggestion.scheme
                    ? limitToOptions
                        .map((val) => val.value)
                        .includes(suggestion.scheme)
                    : true
                )}
                multiple={multiple}
                noQueryMessage={'Search or create subjects...'}
                placeholder={placeholder}
                preSearchChange={this.prepareSuggest}
                required={required}
                serializeSuggestions={this.serializeSubjects}
                serializeAddedValue={(value) => ({
                  text: value,
                  value: value,
                  key: value,
                  subject: value,
                  scheme: this.state.limitTo,
                })}
                suggestionAPIUrl="/api/subjects"
                onValueChange={({ formikProps }, selectedSuggestions) => {
                  // transforming and filtering the available values
                  // note: this is a temporary solution since the InvenioRDM don't provides
                  //       the custom fields. In the future, using the powerful of the InvenioRDM
                  //       custom field, we will have specific vocabularies and field in the
                  //       metadata model.
                  const currentStoredValues = this.transformIntoInitialValues(
                    getIn(values, fieldPath, [])
                  )
                    .map((val) =>
                      !val.scheme ? _set(val, 'scheme', 'custom') : val
                    )
                    .filter(
                      (suggestion) =>
                        ![...limitToOptions, { value: 'custom' }]
                          .map((val) => val.value)
                          .includes(suggestion.scheme)
                    );

                  // transforming the selected field
                  const currentSelectedValues =
                    this.transformIntoInitialValues(selectedSuggestions);

                  formikProps.form.setFieldValue(
                    fieldPath,
                    // save the suggestion objects so we can extract information
                    // about which value added by the user
                    [...currentStoredValues, ...currentSelectedValues]
                  );
                }}
                value={getIn(values, fieldPath, []).map((val) => val.subject)}
                label={<label>&nbsp;</label>} /** For alignment purposes */
                allowAdditions
                width={11}
              />
            );
          }}
        </Field>
      </GroupField>
    );
  }
}

SubjectsField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  initialValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      scheme: PropTypes.string,
      subject: PropTypes.string,
    })
  ),
};

SubjectsField.defaultProps = {
  fieldPath: 'metadata.subjects',
  label: 'Subjects',
  labelIcon: 'tag',
  multiple: true,
  clearable: true,
  placeholder: 'Search for a subject by name',
  initialValues: [],
};

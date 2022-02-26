/*
 * This file is part of GEO-Labels-React.
 * Copyright (C) 2022 CERN.
 *
 * GEO-Labels-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';

import _set from 'lodash/set';
import _first from 'lodash/first';

import PropTypes from 'prop-types';

import { Field, getIn } from 'formik';
import { Form } from 'semantic-ui-react';

import { FieldLabel, RemoteSelectField } from 'react-invenio-forms';

/**
 * Base Labels field class
 *
 * Note: In the current implementation, the labels are supported
 * by the `Subject` field available in the InvenioRDM Metadata Model.
 * In the future this will be replaced by the custom fields feature.
 */
export class BaseLabelField extends Component {
  serializeLabels = (labels) =>
    labels.map((label) => {
      return {
        text: label.subject,
        value: label.subject,
        key: label.subject,
        subject: label.subject, // temporary
        ...(label.id ? { id: label.id } : {}),
        ...(label.scheme ? { scheme: label.scheme } : { scheme: 'custom' }),
      };
    });

  prepareSuggest = (searchQuery) => {
    return `${this.props.scheme}:${searchQuery}`;
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
      allowAdditions,
      noQueryMessage,
      initialValues,
    } = this.props;
    return (
      <Form.Field>
        <FieldLabel
          htmlFor={fieldPath}
          icon={labelIcon}
          label={label}
        ></FieldLabel>
        <Field name={this.props.fieldPath}>
          {({ form: { values } }) => {
            return (
              <RemoteSelectField
                clearable={clearable}
                fieldPath={fieldPath}
                initialSuggestions={initialValues.filter(
                  (suggestion) => suggestion.scheme === this.props.scheme
                )}
                multiple={multiple}
                noQueryMessage={noQueryMessage}
                placeholder={placeholder}
                preSearchChange={this.prepareSuggest}
                required={required}
                serializeSuggestions={this.serializeLabels}
                serializeAddedValue={(value) => ({
                  text: value,
                  value: value,
                  key: value,
                  subject: value,
                  scheme: this.props.scheme,
                })}
                suggestionAPIUrl="/api/subjects"
                onValueChange={({ formikProps }, selectedSuggestions) => {
                  const currentSelectedValues = this.transformIntoInitialValues(
                    getIn(values, fieldPath, [])
                  )
                    .filter(
                      (suggestion) => suggestion.scheme !== this.props.scheme
                    )
                    .map((val) =>
                      val.scheme ? val : _set(val, 'scheme', 'custom')
                    );

                  const selectedSuggestionsValues =
                    this.transformIntoInitialValues(selectedSuggestions);

                  formikProps.form.setFieldValue(
                    fieldPath,
                    // save the suggestion objects so we can extract information
                    // about which value added by the user
                    [...currentSelectedValues, ...selectedSuggestionsValues]
                  );
                }}
                value={getIn(values, fieldPath, []).map((val) => val.subject)}
                label={<label>&nbsp;</label>} /** For alignment purposes */
                allowAdditions={allowAdditions}
                fluid
              />
            );
          }}
        </Field>
      </Form.Field>
    );
  }
}

BaseLabelField.propTypes = {
  allowAdditions: PropTypes.bool,
  scheme: PropTypes.string.isRequired,
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  noQueryMessage: PropTypes.string,
  initialValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      scheme: PropTypes.string,
      subject: PropTypes.string,
    })
  ),
};

BaseLabelField.defaultProps = {
  allowAdditions: false,
  scheme: 'FOS',
  fieldPath: 'metadata.subjects',
  label: 'label',
  labelIcon: 'user',
  multiple: true,
  clearable: true,
  placeholder: 'Type to Search',
  noQueryMessage: 'Type to Search',
  initialValues: [],
};

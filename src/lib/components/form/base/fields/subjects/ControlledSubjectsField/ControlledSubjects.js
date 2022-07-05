/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Field, getIn } from 'formik';
import { FieldLabel, GroupField } from 'react-invenio-forms';

import { RemoteSelectField } from './RemoteSelectField';

import { i18next } from '@translations/i18next';

/**
 * Custom Subjects Field to allow bulk
 * operations for Subject definition.
 *
 * @see https://github.com/inveniosoftware/react-invenio-deposit/blob/b85e393b0c56ff6dd4f295b99bd4ca2e90c45902/src/lib/components/SubjectsField.js
 */
export class ControlledSubjects extends Component {
  state = {
    limitTo: 'all',
  };

  serializeSubjects = (subjects) =>
    subjects.map((subject) => {
      const scheme = subject.scheme ? `(${subject.scheme}) ` : '';
      return {
        text: scheme + subject.subject,
        value: subject.subject,
        key: subject.subject,
        ...(subject.id ? { id: subject.id } : {}),
        subject: subject.subject,
      };
    });

  prepareSuggest = (searchQuery) => {
    const limitTo = this.state.limitTo;
    const prefix = limitTo === 'all' ? '' : `${limitTo}:`;
    return `${prefix}${searchQuery}`;
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
    } = this.props;
    return (
      <GroupField className="main-group-field">
        <Form.Field width={5} className="subjects-field">
          <FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />
          <GroupField>
            <Form.Field
              width={8}
              style={{ marginBottom: 'auto', marginTop: 'auto' }}
              className="p-0"
            >
              {i18next.t('Suggest from')}
            </Form.Field>
            <Form.Dropdown
              className="p-0"
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
                initialSuggestions={getIn(values, fieldPath, [])}
                multiple={multiple}
                noQueryMessage={i18next.t('Search or create subjects...')}
                placeholder={placeholder}
                preSearchChange={this.prepareSuggest}
                required={required}
                serializeSuggestions={this.serializeSubjects}
                serializeAddedValue={(value) => ({
                  text: value,
                  value: value,
                  key: value,
                  subject: value,
                })}
                suggestionAPIUrl="/api/subjects"
                onValueChange={({ formikProps }, selectedSuggestions) => {
                  formikProps.form.setFieldValue(
                    fieldPath,
                    // save the suggestion objects so we can extract information
                    // about which value added by the user
                    selectedSuggestions
                  );
                }}
                value={getIn(values, fieldPath, []).map((val) => val.subject)}
                label={
                  <label className="mobile-hidden">&nbsp;</label>
                } /** For alignment purposes */
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

ControlledSubjects.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  initialOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

ControlledSubjects.defaultProps = {
  fieldPath: 'metadata.subjects',
  label: i18next.t('Subjects'),
  labelIcon: 'tag',
  multiple: true,
  clearable: true,
  placeholder: i18next.t('Search for a subject by name'),
};

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import _find from 'lodash/find';

import { Field, getIn } from 'formik';
import { Header, Icon } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';
import { VocabularySuggestionField } from './VocabularySuggestionField';

/**
 * Authors Formik field.
 * @constructor
 *
 * @param {String} fieldPath Path where the field data will be stored in the Formik data.
 * @param {Object} fieldProps (Spread) Extra parameters for the `VocabularySuggestionField`.
 */
export const AuthorsField = ({ fieldPath, ...fieldProps }) => {
  // Function adapted from `react-invenio-deposit`.
  // At this moment, only the ORCID identifier is supported.
  const generateAuthorObject = (authorName, authorIdentifier) => {
    // Preparing the entry properties
    const icon = `/static/images/orcid.svg`;
    const link = `https://orcid.org/${authorIdentifier}`;

    return (
      <span key={authorIdentifier}>
        {authorName} ({/*<Image*/}
        {/*  src={icon}*/}
        {/*  className={'mr-5 ml-5 mr-5'}*/}
        {/*  verticalAlign={'middle'}*/}
        {/*/>*/} {authorIdentifier})
        <a href={link} target={'_blank'} rel={'noopener noreferrer'}>
          <Icon link name={'external alternate'} className={'spaced-left'} />
        </a>
      </span>
    );
  };

  const serializeSuggestions = (authors) => {
    return authors.map((author) => {
      // preparing the affiliations
      let affiliationNames = '';

      author.affiliations.forEach((affiliation, idx) => {
        affiliationNames += affiliation.name;

        if (idx < author.affiliations.length - 1) {
          affiliationNames += ', ';
        }
      });

      // searching for the `orcid` author reference.
      let authorObject = _find(author.identifiers, (identifier) => {
        return identifier.scheme === 'orcid';
      });

      // generating the component to represent the autor in the interface
      authorObject = generateAuthorObject(author.name, authorObject.identifier);

      // generating the serialized object.
      return {
        text: author.name,
        value: author.id,
        extra: author,
        key: author.id,
        content: (
          <Header as={'h5'}>
            <Header.Content>{authorObject}</Header.Content>
            <Header.Subheader>{affiliationNames}</Header.Subheader>
          </Header>
        ),
      };
    });
  };

  return (
    <Field name={fieldPath}>
      {({ form: { values } }) => {
        return (
          <VocabularySuggestionField
            fieldPath={fieldPath}
            multiple={true}
            selectOnBlur={false}
            allowAdditions={false}
            search={(options) => options}
            suggestionAPIUrl={'/api/names'}
            suggestionAPIHeaders={{
              Accept: 'application/json',
            }}
            serializeSuggestions={serializeSuggestions}
            value={getIn(values, fieldPath, []).map((val) => val.value)}
            onValueChange={({ formikProps }, selectedSuggestions) => {
              formikProps.form.setFieldValue(
                fieldPath,
                // save the suggestion objects so we can extract information
                // about which value added by the user
                selectedSuggestions
              );
            }}
            {...fieldProps}
          />
        );
      }}
    </Field>
  );
};

AuthorsField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
};

AuthorsField.defaultProps = {
  fieldPath: 'metadata.creators',
  label: i18next.t('Authors'),
  labelIcon: 'user',
  placeholder: i18next.t(
    'Search for persons by name, identifier, or affiliation...'
  ),
  noQueryMessage: i18next.t(
    'Search for persons by name, identifier, or affiliation...'
  ),
};

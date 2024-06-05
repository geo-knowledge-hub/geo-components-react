/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import PropTypes from 'prop-types';
import { SelectField } from 'react-invenio-forms';

import { i18next } from '@translations/i18next';
import { Icon } from 'semantic-ui-react';

/**
 * Record Type field for the GEO Knowledge Hub.
 * @constructor
 *
 * @param {String} fieldPath Path where the field data will be stored in the
 *                           Formik context.
 * @param {Object} fieldProps (Spread) Extra parameters for the `SelectField`.
 */
export const RecordTypeField = ({ fieldPath, ...fieldProps }) => {
  return (
    <SelectField
      fieldPath={fieldPath}
      options={[
        {
          id: 'package',
          key: 'package',
          text: 'Knowledge Package',
          value: 'package',
        },
        {
          id: 'resource',
          key: 'resource',
          text: 'Knowledge Resource',
          value: 'resource',
        },
        {
          id: 'marketplace-item',
          key: 'marketplace-item',
          text: 'Commercial Item',
          value: 'marketplace-item',
        },
      ]}
      {...fieldProps}
    />
  );
};

RecordTypeField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
};

RecordTypeField.defaultProps = {
  fieldPath: 'metadata.record_type',
  label: (
    <>
      <Icon name={'shopping bag'} /> {i18next.t('Record type')}
    </>
  ),
  placeholder: i18next.t('Select a Record Type'),
  noQueryMessage: i18next.t('Start typing to search for a Record Type'),
  multiple: true,
};

/*
 * This file is part of GEO-Labels-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Labels-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { BaseLabelField } from '../../../../../base';

export class EngagementPrioritiesField extends Component {
  render() {
    const { subjectProps } = this.props;

    return (
      <BaseLabelField
        label={'Engagement Priorities'}
        labelIcon={'tag'}
        multiple={true}
        clearable={true}
        placeholder={'Search for a Engagement Priority by name'}
        {...subjectProps}
      />
    );
  }
}

EngagementPrioritiesField.propTypes = {
  subjectProps: PropTypes.object,
};

EngagementPrioritiesField.defaultProps = {
  subjectProps: {
    scheme: 'EP',
    fieldPath: 'metadata.subjects',
  },
};

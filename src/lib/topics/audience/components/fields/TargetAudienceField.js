/*
 * This file is part of GEO-Labels-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Labels-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { BaseLabelField } from '../../../../base';

/**
 * Target Audience Field for the GEO Knowledge Hub pages.
 */
export class TargetAudienceField extends Component {
  render() {
    const { subjectProps } = this.props;

    return (
      <BaseLabelField
        label={'Target audience'}
        labelIcon={'user'}
        multiple={true}
        clearable={true}
        placeholder={'Search for a specific target audience'}
        {...subjectProps}
      />
    );
  }
}

TargetAudienceField.propTypes = {
  subjectProps: PropTypes.object,
};

TargetAudienceField.defaultProps = {
  subjectProps: {
    scheme: 'TU',
    fieldPath: 'metadata.subjects',
  },
};

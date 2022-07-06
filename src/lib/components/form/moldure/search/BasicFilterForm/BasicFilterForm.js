/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import {
  BasicSubjectsField,
  EngagementPriorityField,
  TargetAudienceField,
  WorkProgrammeActivityField,
  ResourceTypeField,
  AuthorsField,
} from '../../../base';

/**
 * Basic fields for Filter Form components.
 * @constructor
 *
 * @param {Object} fieldsConfig Configuration object for the fields used in the form which includes:
 *                                - AuthorsField (key: `authors`)
 *                                - WorkProgrammeActivityField (key: `programmeActivity`)
 *                                - EngagementPriorityField (key: `engagementPriorities`)
 *                                - TargetAudienceField (key: `targetAudience`)
 *                                - ResourceTypeField (key: `resourceType`)
 *
 * @param fieldsConfig
 * @returns {JSX.Element}
 */
export const BasicFilterForm = ({ fieldsConfig }) => {
  return (
    <>
      <Grid verticalAlign="middle" centered>
        <Grid.Row>
          <Grid.Column width={16}>
            <AuthorsField fluid required={false} {...fieldsConfig.authors} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <WorkProgrammeActivityField
              fluid
              required={false}
              {...fieldsConfig.programmeActivity}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <EngagementPriorityField
              fluid
              required={false}
              {...fieldsConfig.engagementPriorities}
            />
          </Grid.Column>

          <Grid.Column>
            <TargetAudienceField
              fluid
              required={false}
              {...fieldsConfig.targetAudience}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <ResourceTypeField
              fluid
              required={false}
              {...fieldsConfig.resourceType}
            />
          </Grid.Column>

          <Grid.Column>
            <BasicSubjectsField fluid required={false} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

BasicFilterForm.propTypes = {
  fieldsConfig: PropTypes.shape({
    authors: PropTypes.object,
    programmeActivity: PropTypes.object,
    engagementPriorities: PropTypes.object,
    targetAudience: PropTypes.object,
    resourceType: PropTypes.object,
    subjects: PropTypes.object,
  }),
};

BasicFilterForm.defaultProps = {
  fieldsConfig: {},
};

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
} from '../../../../../base';

/**
 * Basic fields for Filter Form components.
 * @constructor
 *
 * @param {String} fieldPathPrefix Prefix used in the storage to store the field values.
 * @param {Object} fieldConfig Configuration object for the fields used in the form which includes:
 *                                - AuthorsField (key: `authors`)
 *                                - WorkProgrammeActivityField (key: `programmeActivities`)
 *                                - EngagementPriorityField (key: `engagementPriorities`)
 *                                - TargetAudienceField (key: `targetAudiences`)
 *                                - ResourceTypeField (key: `resourceTypes`)
 *                                - BasicSubjectsField (key: `subjects`)
 *
 * @returns {JSX.Element}
 */
export const BasicFilterForm = ({ fieldPathPrefix, ...fieldConfig }) => {
  // Auxiliary functions
  const generateFieldPathWithPrefix = (value) => `${fieldPathPrefix}.${value}`;

  return (
    <>
      <Grid verticalAlign="middle" centered>
        <Grid.Row>
          <Grid.Column width={16}>
            <ResourceTypeField
              fluid
              multiple={true}
              clearable={true}
              required={false}
              fieldPath={generateFieldPathWithPrefix('resourceTypes')}
              {...fieldConfig.resourceTypes}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <WorkProgrammeActivityField
              fluid
              multiple={true}
              clearable={true}
              required={false}
              fieldPath={generateFieldPathWithPrefix('programmeActivities')}
              {...fieldConfig.programmeActivities}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <EngagementPriorityField
              fluid
              multiple={true}
              clearable={true}
              required={false}
              fieldPath={generateFieldPathWithPrefix('engagementPriorities')}
              {...fieldConfig.engagementPriorities}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <TargetAudienceField
              fluid
              multiple={true}
              clearable={true}
              required={false}
              fieldPath={generateFieldPathWithPrefix('targetAudiences')}
              {...fieldConfig.targetAudiences}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <BasicSubjectsField
              fluid
              multiple={true}
              clearable={true}
              required={false}
              fieldPath={generateFieldPathWithPrefix('subjects')}
              {...fieldConfig.subjects}
            />
          </Grid.Column>

          <Grid.Column>
            <AuthorsField
              fluid
              clearable={true}
              required={false}
              fieldPath={generateFieldPathWithPrefix('authors')}
              {...fieldConfig.authors}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

BasicFilterForm.propTypes = {
  fieldPathPrefix: PropTypes.string.isRequired,
  fieldConfig: PropTypes.shape({
    authors: PropTypes.object,
    programmeActivities: PropTypes.object,
    engagementPriorities: PropTypes.object,
    targetAudiences: PropTypes.object,
    resourceTypes: PropTypes.object,
    subjects: PropTypes.object,
  }),
};

BasicFilterForm.defaultProps = {
  fieldPathPrefix: 'form',
  fieldConfig: {},
};

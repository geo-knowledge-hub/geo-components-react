/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import { RecordList } from '../moldure';
import { mutateRecordData } from '../base/mutations';

export const MoreLikeThisRecords = ({ records }) => {
  const mutatedRecords = records.map((row) =>
    mutateRecordData(row, 'resourceType', 'grey')
  );

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column
          widescreen={16}
          largeScreen={16}
          computer={16}
          mobile={16}
          tablet={16}
        >
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <RecordList records={mutatedRecords} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

MoreLikeThisRecords.propTypes = {
  records: PropTypes.array.isRequired,
};

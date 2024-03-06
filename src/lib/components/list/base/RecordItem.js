/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Card, Grid, Header, Label, Segment } from 'semantic-ui-react';

export const RecordItem = ({ recordData }) => {
  // Preparing authors
  const recordAuthors = recordData.authors.join('; ');

  // Preparing initiatives
  const recordLabel = recordData.label;
  const recordLabelColor = recordData.labelColor;

  return (
    <Segment as={Card} link fluid href={recordData.url}>
      <Grid padded>
        <Grid.Row only={'mobile'}>
          <Label size={'small'} attached={'top'} color={recordLabelColor}>
            {recordLabel}
          </Label>
        </Grid.Row>
      </Grid>
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column
            largeScreen={13}
            widescreen={13}
            computer={13}
            mobile={16}
            tablet={12}
          >
            <Header as={'h3'}>{recordData.title}</Header>
          </Grid.Column>
          <Grid.Column
            largeScreen={3}
            widescreen={3}
            computer={3}
            tablet={4}
            textAlign={'right'}
            only="tablet computer"
          >
            <Label color={recordLabelColor}>{recordLabel}</Label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign={'left'}>
            <p>{recordAuthors}</p>
          </Grid.Column>
          <Grid.Column textAlign={'right'}>
            <p>Uploaded on {recordData.date}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

RecordItem.propTypes = {
  recordData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string.isRequired,
    labelColor: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

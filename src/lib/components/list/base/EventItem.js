/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';

export const EventItem = ({ eventData }) => {
  return (
    <Segment as={Card} link fluid>
      <Grid padded>
        <Grid.Row only={'mobile'}>
          <Label size={'small'} attached={'top'}>
            {eventData.category}
          </Label>
        </Grid.Row>
      </Grid>
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column
            largeScreen={12}
            widescreen={12}
            computer={12}
            mobile={16}
            tablet={12}
          >
            <Header as={'h3'}>{eventData.title}</Header>
          </Grid.Column>
          <Grid.Column
            largeScreen={4}
            widescreen={4}
            computer={4}
            tablet={4}
            textAlign={'right'}
            only={'tablet computer'}
          >
            <Label style={{ fontSize: '11px' }}>
              {eventData.category}
            </Label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign={'bottom'}>
          <Grid.Column
            largeScreen={9}
            widescreen={9}
            computer={9}
            mobile={16}
            tablet={9}
          >
            <Grid doubling>
              <Grid.Column
                largeScreen={10}
                widescreen={10}
                computer={10}
                mobile={16}
                tablet={16}
              >
                <Icon name={'calendar'} /> {eventData.date}
              </Grid.Column>
              <Grid.Column
                largeScreen={6}
                widescreen={6}
                computer={6}
                mobile={7}
                tablet={16}
                textAlign={'left'}
              >
                <Icon name={'location arrow'} /> {eventData.location}
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column width={7} only={'computer tablet'}>
            <Button
              as={'a'}
              floated={'right'}
              content={'Learn more'}
              size={'tiny'}
              href={eventData.url}
              target={'_blank'}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width={16} only={'mobile'}>
          <Button
            as={'a'}
            fluid
            content={'Learn more'}
            href={eventData.url}
            target={'_blank'}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

EventItem.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

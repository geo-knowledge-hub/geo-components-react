/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Grid, Loader, Message } from 'semantic-ui-react';

import { useQuery } from '@tanstack/react-query';

import { EventList } from '../moldure';
import { fetchEvents } from '../../../resources';
import { mutateEventData } from '../base/mutations';

export const LatestEvents = ({ fetchUrl, moreUrl, staleTime }) => {
  const {
    data: records,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['latest-events'],
    queryFn: () => {
      return fetchEvents(fetchUrl);
    },
    staleTime,
  });

  const mutatedRecords = !isFetching ? records.map(mutateEventData) : [];

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column widescreen={10} largeScreen={10} computer={10} mobile={15} tablet={14}>
          {isFetching && <Loader active inline="centered" />}

          {!isFetching && !error && (
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <EventList events={mutatedRecords} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Container textAlign={'center'}>
                  <Button as={'a'} href={moreUrl} target={'_blank'}>More</Button>
                </Container>
              </Grid.Row>
            </Grid>
          )}
          {error && (
            <Message content={error.message} error icon={'warning sign'} />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

LatestEvents.propTypes = {
  fetchUrl: PropTypes.string.isRequired,
  moreUrl: PropTypes.string.isRequired,
  staleTime: PropTypes.number,
};

LatestEvents.defaultProps = {
  staleTime: 300000, // 5 minutes
};

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useContext } from 'react';

import { Card, Grid, List, Icon } from 'semantic-ui-react';

import { IndexContext } from '../IndexContext';
import { guessRecordGroupIcon } from '../operations/style';

/**
 * Type selector for the Search Menu.
 */
export const TypeSelectorCard = () => {
  const indexContext = useContext(IndexContext);

  const { recordTypeCount } = indexContext.resourceTypeMenuContext;
  const { activeResourceType, setActiveResourceType } =
    indexContext.searchContext.faceted.resourceType;

  return (
    <Card.Group itemsPerRow={4} as={List} selection stackable>
      {recordTypeCount &&
        recordTypeCount.map((option, index) => (
          <Card
            as={List.Item}
            key={index}
            onClick={() => {
              let activeResourceTypeValue = option.name;
              if (activeResourceType === option.name) {
                activeResourceTypeValue = null;
              }
              setActiveResourceType(activeResourceTypeValue);
            }}
            active={activeResourceType === option.name}
          >
            <Card.Content>
              <Card.Header>
                <Grid relaxed columns={2}>
                  <Grid.Row only={'tablet computer'}>
                    <Grid.Column width={10}>{option.name}</Grid.Column>
                    <Grid.Column floated={'right'} width={6}>
                      <Icon
                        name={guessRecordGroupIcon(option.name)}
                        size={'large'}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row only={'mobile'}>
                    <Grid.Column width={12}>{option.name}</Grid.Column>
                    <Grid.Column floated={'left'} width={1}>
                      <Icon
                        name={guessRecordGroupIcon(option.name)}
                        size={'large'}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Header>
              <Card.Meta>{option.numberOfRecords} resources</Card.Meta>
            </Card.Content>
          </Card>
        ))}
    </Card.Group>
  );
};

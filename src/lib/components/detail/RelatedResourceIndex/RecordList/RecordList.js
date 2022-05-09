/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useContext } from 'react';

import { Header, Icon, Item, Segment } from 'semantic-ui-react';

import { IndexContext } from '../IndexContext';
import { RecordListItem } from './RecordListItem';

/**
 * Record List component.
 */
export const RecordList = () => {
  const indexContext = useContext(IndexContext);

  const records = indexContext.searchContext.index.results;

  return (
    <>
      {records.length > 0 ? (
        <Segment attached="bottom">
          <Item.Group divided>
            {records.map((record) => (
              <RecordListItem key={record.id} recordData={record} />
            ))}
          </Item.Group>
        </Segment>
      ) : (
        <Segment placeholder>
          <Header icon>
            <Icon name="search" />
            We don't have any documents matching your query.
          </Header>
        </Segment>
      )}
    </>
  );
};

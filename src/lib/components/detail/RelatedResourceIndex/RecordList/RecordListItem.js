/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import _get from 'lodash/get';

import { Item, Label } from 'semantic-ui-react';

/**
 * Record Item component for the Record List
 */
export const RecordListItem = ({ recordData }) => (
  <Item key={recordData.id}>
    <Item.Content>
      <Item.Header as={'a'} href={recordData.url}>{recordData.title}</Item.Header>
      <Item.Meta>
        {recordData.ui.creators.creators.slice(0, 3).map((creator, index) => (
          <span className={'cinema'} key={index}>
            {creator.person_or_org.name};
          </span>
        ))}
      </Item.Meta>
      <Item.Description>
        {_get(
          recordData.ui,
          'description_stripped',
          'No description available.'
        )}
      </Item.Description>
      <Item.Extra>
        <Label
          size={'tiny'}
          color="blue"
          content={recordData.ui.publication_date_l10n_medium}
        />

        <Label
          size={'tiny'}
          color="grey"
          content={recordData.ui.resource_type.title_l10n}
        />

        <Label
          size={'tiny'}
          color="grey"
          className={`access-status ${recordData.ui.access_status.id}`}
          content={
            <i className={`icon ${recordData.ui.access_status.icon}`}>
              {recordData.ui.access_status.title_l10n}
            </i>
          }
        />
      </Item.Extra>
    </Item.Content>
  </Item>
);

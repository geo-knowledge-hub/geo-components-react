/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import _get from 'lodash/get';

import styled from '@emotion/styled';
import { Item, Label } from 'semantic-ui-react';

/**
 * Styled components
 */
const ItemHeader = styled.div`
  color: #444447;
  font-size: 15px;
`;

/**
 * Record Item component for the Record List
 */
export const RecordListItem = ({ recordData }) => (
  <Item key={recordData.id}>
    <Item.Content>
      <Item.Header as={'a'} href={recordData.url}>
        <ItemHeader>{recordData.title}</ItemHeader>
      </Item.Header>
      <Item.Meta>
        {recordData.ui.creators.creators.map((creator, index) => (
          <span className={'cinema'} key={index}>
            {creator.person_or_org.name};
          </span>
        ))}
      </Item.Meta>
      <Item.Extra>
        <Label
          size={'tiny'}
          color="blue"
          content={recordData.ui.publication_date_l10n_medium}
        />

        <Label
          size={'tiny'}
          color="grey"
          content={_get(
            // getting only the acronym (between '(' and ')')
            recordData.ui.geo_work_programme_activity.title_l10n.match(
              /\(([^)]+)\)/
            ),
            1,
            null
          )}
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
            <>
              <i className={`icon ${recordData.ui.access_status.icon}`}></i>{' '}
              {recordData.ui.access_status.title_l10n}
            </>
          }
        />
      </Item.Extra>
    </Item.Content>
  </Item>
);

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
export const RecordListItem = ({ recordData }) => {
  // extracting the informations
  const creators = _get(recordData, 'ui.creators.creators', null);
  const publicationDate = _get(
    recordData,
    'ui.publication_date_l10n_medium',
    null
  );

  const programmeActivity = _get(
    recordData,
    'ui.geo_work_programme_activity.title_l10n',
    null
  );

  const resourceType = _get(recordData, 'ui.resource_type.title_l10n', null);

  // access status
  const accessStatusID = _get(recordData, 'ui.access_status.id', null);
  const accessStatusIcon = _get(recordData, 'ui.access_status.icon', null);
  const accessStatusTitle = _get(
    recordData,
    'ui.access_status.title_l10n',
    null
  );

  return (
    <Item key={recordData.id}>
      <Item.Content>
        <Item.Header as={'a'} href={recordData.url}>
          <ItemHeader>{recordData.title}</ItemHeader>
        </Item.Header>
        <Item.Meta>
          {creators ? (
            <>
              {recordData.ui.creators.creators.map((creator, index) => (
                <span className={'cinema'} key={index}>
                  {creator.person_or_org.name};
                </span>
              ))}
            </>
          ) : null}
        </Item.Meta>
        <Item.Extra>
          {publicationDate ? (
            <Label size={'tiny'} color="blue" content={publicationDate} />
          ) : null}

          {programmeActivity ? (
            <Label
              size={'tiny'}
              color="grey"
              content={_get(
                // getting only the acronym (between '(' and ')')
                programmeActivity.match(/\(([^)]+)\)/),
                1,
                null
              )}
            />
          ) : null}

          {resourceType ? (
            <Label size={'tiny'} color="grey" content={resourceType} />
          ) : null}

          {accessStatusID && accessStatusIcon && accessStatusTitle ? (
            <Label
              size={'tiny'}
              color="grey"
              className={`access-status ${accessStatusID}`}
              content={
                <>
                  <i className={`icon ${accessStatusIcon}`}></i>{' '}
                  {accessStatusTitle}
                </>
              }
            />
          ) : null}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

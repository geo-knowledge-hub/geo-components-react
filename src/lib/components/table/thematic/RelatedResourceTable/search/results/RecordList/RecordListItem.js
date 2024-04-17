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

import './RecordListItem.css';

/**
 * Extract Record badge.
 *
 * @param {string} recordType String containing the type of record.
 */
export const extractRecordBadge = (recordType) => {
  let recordBadge = {
    name: 'Open',
    color: 'primary',
    icon: 'lock open',
  };

  // Currently, we only have "Marketplace Item" as closed records
  if (recordType === 'marketplace-item') {
    recordBadge = {
      name: 'Marketplace',
      color: 'primary',
      icon: 'building',
    };
  }

  return recordBadge;
};

/**
 * Record Item component for the Record List
 */
export const RecordListItem = ({ recordData, packageId }) => {
  const recordBadge = extractRecordBadge(recordData.parent.type);

  const creators = _get(recordData, 'ui.creators.creators', null);
  const publicationDate = _get(
    recordData,
    'ui.publication_date_l10n_medium',
    null
  );
  const version = _get(recordData, 'ui.version', null);

  const programmeActivity = _get(
    recordData,
    'ui.geo_work_programme_activity.title_l10n',
    null
  );

  const resourceType = _get(recordData, 'ui.resource_type.title_l10n', null);

  // access status
  const restrictedToUser = _get(recordData, 'status', null) === 'restricted';

  // record status
  const isDraft = _get(recordData, 'is_draft', null);
  const isPackage = _get(recordData, 'parent.type', null) === 'package';

  // record url
  const recordId = _get(recordData, 'id', null);
  const recordUrlPrefix = isPackage ? 'packages' : 'records';

  let recordUrl = `/${recordUrlPrefix}/${recordId}?package=${packageId}`;

  if (isDraft) {
    recordUrl = `${recordUrl}&preview=1&navigate=1`;
  }

  return (
    <Item key={recordData.id}>
      <Item.Content>
        <Item.Header
          as={'a'}
          href={restrictedToUser ? null : recordUrl}
          color={restrictedToUser ? 'gray' : 'black'}
        >
          <div className="item-header">{recordData.metadata.title}</div>
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
          <Label size="mini" color={recordBadge.color}>
            <i className={`icon ${recordBadge.icon}`}></i>
            {recordBadge.name}
          </Label>
          <Label size="mini" color={'gray'}>
            {publicationDate} ({version})
          </Label>
          <Label size="mini" color={'gray'}>
            {resourceType}
          </Label>

          {programmeActivity ? (
            <Label
              size={'mini'}
              color={'gray'}
              content={_get(
                // getting only the acronym (between '(' and ')')
                programmeActivity.match(/\(([^)]+)\)/),
                1,
                null
              )}
            />
          ) : null}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

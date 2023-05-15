/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import { PaginableTable } from '../../moldure';

import _get from 'lodash/get';
import _head from 'lodash/head';
import _isNil from 'lodash/isNil';
import _sortBy from 'lodash/sortBy';
import _groupBy from 'lodash/groupBy';

import { Icon, Dropdown, Grid } from 'semantic-ui-react';

/**
 * External resource table.
 */
export const RelatedPackagesTable = ({ tableData }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      {
        Header: () => null,
        id: 'related-packages-versions',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          // Preparing versions of the row
          const rowVersions = rowData.map((data, index) => {
            // Defining record url
            const isDraft = _get(data, 'is_draft', null);
            const isPackage = _get(data, 'parent.type', null) === 'package';

            const recordId = _get(data, 'id', null);
            const recordUrlPrefix = isPackage ? 'packages' : 'records';

            let recordUrl =  `/${recordUrlPrefix}/${recordId}`;

            if (isDraft) {
              recordUrl = `${recordUrl}?preview=1&navigate=1`;
            }

            return {
              title: data.metadata.title,
              version: `Version ${data.versions.index} (${data.ui.created_date_l10n_long})`,
              url: recordUrl,
            }
          });

          // Getting the title from the first version
          const rowFirstVersion = _head(_sortBy(rowVersions));

          return (
            <Grid>
              <Grid.Row verticalAlign="middle">
                <Grid.Column width={1}>
                  <Icon name="box" size="big" />
                </Grid.Column>
                <Grid.Column width={11}>
                  <p>{rowFirstVersion.title}</p>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Dropdown
                    icon={'history'}
                    floating
                    button
                    basic
                    labeled
                    text={'Versions'}
                    className="icon right floated"
                  >
                    <Dropdown.Menu>
                      {rowVersions.map((rowVersion) => (
                        <Dropdown.Item href={rowVersion.url}>
                          {rowVersion.version}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        },
      },
    ];
  });

  // Handling packages versions.
  // Note: Each table row can have multiple versions
  const tableDataGroups = _groupBy(tableData, 'parent.id');
  const tableDataMemoized = useMemo(() => Object.values(tableDataGroups));

  return (
    <>
      <PaginableTable
        unstackable
        fixed={false}
        padded={true}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
      />
    </>
  );
};

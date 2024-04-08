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
import _last from 'lodash/last';
import _isNil from 'lodash/isNil';
import _sortBy from 'lodash/sortBy';
import _groupBy from 'lodash/groupBy';

import { Icon, Dropdown, Grid } from 'semantic-ui-react';

import './RelatedPackagesTable.css';

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

            let recordUrl = `/${recordUrlPrefix}/${recordId}`;

            if (isDraft) {
              recordUrl = `${recordUrl}?preview=1&navigate=1`;
            }

            return {
              title: data.metadata.title,
              version: `Version ${data.versions.index} (${data.ui.created_date_l10n_long})`,
              url: recordUrl,
            };
          });

          // Getting the title from the latest version
          const rowLastVersion = _last(_sortBy(rowVersions));

          return (
            <Grid>
              <Grid.Row verticalAlign="middle">
                <Grid.Column
                  widescreen={1}
                  largeScreen={1}
                  computer={1}
                  mobile={2}
                  tablet={1}
                >
                  <Icon name="box" size="big" />
                </Grid.Column>
                <Grid.Column
                  widescreen={11}
                  largeScreen={11}
                  computer={11}
                  mobile={14}
                  tablet={11}
                >
                  <a href={rowLastVersion.url}>{rowLastVersion.title}</a>
                </Grid.Column>
                <Grid.Column
                  widescreen={4}
                  largeScreen={4}
                  computer={4}
                  mobile={16}
                  tablet={4}
                >
                  <Dropdown
                    icon={'history'}
                    floating
                    button
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
    <div className="related-packages-table">
      <PaginableTable
        unstackable
        fixed={false}
        padded={true}
        showHeader={false}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
      />
    </div>
  );
};

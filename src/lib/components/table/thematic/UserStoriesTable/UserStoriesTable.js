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

import { Icon, Grid, Button, Header } from 'semantic-ui-react';

import './UserStoriesTable.css';

/**
 * Users Stories table.
 */
export const UserStoriesTable = ({ tableData }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      {
        Header: () => null,
        id: 'users-stories-version',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          const rowTitle = _get(rowData, 'metadata.title', 'No title');
          const rowDate = _get(rowData, 'ui.created_date_l10n_long', 'No date');
          const rowUrl = _get(rowData, 'links.self_html');

          return (
            <Grid>
              <Grid.Row verticalAlign="middle">
                <Grid.Column width={1}>
                  <Icon name="user" size="big" />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Grid className={'user-stories-metadata'}>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Header>{rowTitle}</Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                      <Grid.Column>{rowDate}</Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Button
                    icon={'arrow right'}
                    floated={'right'}
                    href={rowUrl}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        },
      },
    ];
  });

  // Memoizing data
  const tableDataMemoized = useMemo(() => tableData);

  return (
    <>
      <PaginableTable
        unstackable
        fixed={false}
        padded={true}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
        className={'users-stories-table'}
      />
    </>
  );
};

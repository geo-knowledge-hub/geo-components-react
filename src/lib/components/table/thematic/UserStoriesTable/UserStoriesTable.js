/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { BaseGlobalFilter } from '../../base';
import { PaginableTable } from '../../moldure';

import _get from 'lodash/get';

import { Icon, Grid, Button, Header } from 'semantic-ui-react';

import './UserStoriesTable.css';

/**
 * Users Stories table.
 */
export const UserStoriesTable = ({ tableData, packageId }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      // Defining invisible columns that are used as the index for the table filter
      {
        Header: () => null,
        id: 'idx_title',
        accessor: 'metadata.title',
      },
      {
        Header: () => null,
        id: 'idx_description',
        accessor: 'metadata.description',
      },
      // Content column
      {
        Header: () => null,
        id: 'users-stories-version',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          // record status
          const isDraft = _get(rowData, 'is_draft', null);
          const isPackage = _get(rowData, 'parent.type', null) === 'package';

          const rowTitle = _get(rowData, 'metadata.title', 'No title');
          const rowDate = _get(rowData, 'ui.created_date_l10n_long', 'No date');

          // Record url
          const recordId = _get(rowData, 'id', null);
          const recordUrlPrefix = isPackage ? 'packages' : 'records';

          let rowUrl = `/${recordUrlPrefix}/${recordId}?package=${packageId}`;

          if (isDraft) {
            rowUrl = `${rowUrl}&preview=1&navigate=1`;
          }

          return (
            <Grid>
              <Grid.Row verticalAlign="middle">
                <Grid.Column
                  widescreen={13}
                  largeScreen={13}
                  computer={13}
                  tablet={13}
                  mobile={13}
                >
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
                <Grid.Column
                  widescreen={3}
                  largeScreen={3}
                  computer={3}
                  only={'computer'}
                >
                  <Button.Group size={'mini'} floated={'right'}>
                    <Button
                      content={'Access'}
                      as={'a'}
                      size={'mini'}
                      href={rowUrl}
                    >
                      Access
                    </Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row only={'tablet mobile'} className={'pt-0'}>
                <Grid.Column width={16} className={'pt-0'}>
                  <Button
                    content={'Access'}
                    as={'a'}
                    size={'mini'}
                    href={rowUrl}
                    fluid
                  >
                    Access
                  </Button>
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

  // Defining valid page sizes
  const pageSizes = [3, 5, 10];

  return (
    <>
      <PaginableTable
        unstackable
        fixed={false}
        padded={true}
        pageSizes={pageSizes}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
        className={'users-stories-table'}
        showHeader={false}
        initialState={{
          hiddenColumns: ['idx_title', 'idx_description'],
        }}
        globalFilter={(
          globalFilter,
          preGlobalFilteredRows,
          setGlobalFilter
        ) => (
          <BaseGlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            preGlobalFilteredRows={preGlobalFilteredRows}
          />
        )}
      />
    </>
  );
};

UserStoriesTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  packageId: PropTypes.string.isRequired,
};

UserStoriesTable.defaultProps = {
  packageId: '#',
};

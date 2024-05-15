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

import regeneratorRuntime from 'regenerator-runtime';
import { useAsyncDebounce } from 'react-table';

import { Grid, Button, Icon, Input, Header, Label } from 'semantic-ui-react';

import './RecordsTable.css';
import { mutateRecordData } from '../../../list/base/mutations';

/**
 * Table of Records component.
 */
export const RecordsTable = ({ tableData, tableConfig }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      // Defining invisible columns that are used as the index for the table filter
      {
        Header: () => null,
        id: 'idx_title',
        accessor: 'title',
      },
      {
        Header: () => null,
        id: 'idx_relation_type',
        accessor: 'relation_type.title_l10n',
      },
      {
        Header: () => null,
        id: 'idx_resource_type',
        accessor: 'resource_type.title_l10n',
      },
      {
        Header: () => null,
        id: 'idx_scheme',
        accessor: 'scheme',
      },
      // Content column
      {
        Header: () => null,
        id: 'table-see-also-records',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          // Preparing data
          // Title and date
          const rowTitle = _get(rowData, 'title');
          const rowDate = _get(rowData, 'date');

          // URL
          const rowUrl = _get(rowData, 'url');

          // Resource Type
          const rowLabel = _get(rowData, 'label');
          const rowLabelColor = _get(rowData, 'labelColor');

          return (
            <Grid>
              <Grid.Row verticalAlign="middle">
                <Grid.Column
                  widescreen={13}
                  largeScreen={13}
                  computer={13}
                  tablet={16}
                  mobile={16}
                >
                  <div>
                    <Label size={'tiny'} color={rowLabelColor}>
                      {rowLabel}
                    </Label>
                  </div>

                  <Grid className={'user-stories-metadata'}>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Header>{rowTitle}</Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <p className="content-description">{rowDate}</p>
                      </Grid.Column>
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

  const tableDataMemoized = useMemo(() =>
    tableData.map((row) => mutateRecordData(row, 'resourceType', 'gray'))
  );

  return (
    <div className={'table-records'}>
      <PaginableTable
        unstackable
        fixed={true}
        padded={true}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
        initialState={{
          hiddenColumns: [
            'idx_title',
            'idx_relation_type',
            'idx_resource_type',
            'idx_scheme',
          ],
        }}
        showHeader={false}
        {...tableConfig}
      />
    </div>
  );
};

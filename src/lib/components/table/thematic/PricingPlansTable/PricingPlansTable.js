/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2024 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import { PaginableTable } from '../../moldure';

import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _truncate from 'lodash/truncate';

import regeneratorRuntime from 'regenerator-runtime';
import { useAsyncDebounce } from 'react-table';

import { Grid, Button, Icon, Input, Header, Label } from 'semantic-ui-react';

import './PricingPlansTable.css';


/**
 * Global filter component for the external resources table.
 */
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Input
      fluid
      icon
      placeholder={'Type to search...'}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    >
      <input />
      <Icon name={'search'} />
    </Input>
  );
}

/**
 * Pricing Plans table for marketplace.
 */
export const PricingPlansTable = ({ tableData, tableConfig }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      // Defining invisible columns that are used as the index for the
      // table filter
      {
        Header: () => null,
        id: 'idx_title',
        accessor: 'title',
      },
      {
        Header: () => null,
        id: 'idx_description',
        accessor: 'description',
      },
      {
        Header: () => null,
        id: 'idx_url',
        accessor: 'url',
      },
      {
        Header: () => null,
        id: 'idx_value',
        accessor: 'value',
      },
      // Content column
      {
        Header: () => null,
        id: 'external-resources-table',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          // Preparing data
          // Title
          const rowTitle = _get(rowData, 'title');

          // Description
          const rowDescription = _get(rowData, 'description');

          // URL
          const rowUrl = _get(rowData, 'url');

          // Value
          const rowValue = _get(rowData, 'value');

          return (
            <Grid stackable>
              <Grid.Row verticalAlign="middle">
                <Grid.Column
                  widescreen={13}
                  largeScreen={13}
                  computer={13}
                  tablet={13}
                  mobile={12}
                >
                  <Grid className={'user-stories-metadata'}>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Header>{rowTitle}</Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <p className="content-description">
                          {rowDescription}
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column
                  widescreen={3}
                  largeScreen={3}
                  computer={3}
                  tablet={3}
                  mobile={3}
                >
                  <Button
                    animated
                    as={'a'}
                    size={'small'}
                    target={'_blank'}
                    fluid={true}
                    href={rowUrl}
                  >
                    <Button.Content visible>
                      {rowValue}
                    </Button.Content>
                    <Button.Content hidden>Learn more</Button.Content>
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        },
      },
    ];
  });

  const tableDataMemoized = useMemo(() => tableData);

  return (
    <div className={'table-marketplace-pricing-plans'}>
      <PaginableTable
        unstackable
        fixed={true}
        padded={true}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
        initialState={{
          hiddenColumns: [
            'idx_title',
            'idx_description',
            'idx_url',
            'idx_value',
          ],
        }}
        globalFilter={(
          globalFilter,
          preGlobalFilteredRows,
          setGlobalFilter
        ) => (
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            preGlobalFilteredRows={preGlobalFilteredRows}
          />
        )}
        showHeader={false}
        {...tableConfig}
      />
    </div>
  );
};

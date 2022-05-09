/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { useTable, useSortBy, usePagination } from 'react-table';
import { Pagination, Grid, Container, Dropdown } from 'semantic-ui-react';

import { BaseTable } from './BaseTable';

/**
 * Constants
 */
const VALID_PAGE_SIZES = [5, 10, 20, 30, 40, 50];

/**
 * Atomic table to be used as basis to create specialized tables.
 *
 * @returns
 */
export const PaginableTable = ({ columnsConfiguration, data, ...uiProps }) => {
  const {
    getTableProps,
    getTableBodyProps,
    columns,
    page,
    prepareRow,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageSize },
  } = useTable(
    {
      columns: columnsConfiguration,
      data: data,
      initialState: { pageIndex: 0, pageSize: VALID_PAGE_SIZES[0] },
    },
    useSortBy,
    usePagination
  );

  return (
    <Container>
      <BaseTable
        rows={page}
        columns={columns}
        prepareRow={prepareRow}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        selectable={true}
        sortable={true}
        {...uiProps}
      />
      <Grid>
        <Grid.Column>
          <Dropdown
            item
            simple
            text={`Page size: ${pageSize}`}
            direction={'right'}
            onChange={(_, data) => {
              setPageSize(data.value);
            }}
            options={VALID_PAGE_SIZES.map((v) => ({
              key: v,
              text: v,
              value: v,
            }))}
          />
        </Grid.Column>
      </Grid>

      <Grid centered columns={1}>
        <Pagination
          siblingRange={1}
          boundaryRange={1}
          firstItem={null}
          lastItem={null}
          ellipsisItem={null}
          totalPages={pageOptions.length}
          onPageChange={(_, data) => {
            // `-1`: semantic-ui indexes starting in `1` and `react-table`
            // starts in `0`. So, here, we subtract `-1` to avoid errors.
            gotoPage(data.activePage - 1);
          }}
        />
      </Grid>
    </Container>
  );
};

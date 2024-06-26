/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';

import { Pagination, Grid, Container, Dropdown } from 'semantic-ui-react';

import { BaseTable } from '../base';

/**
 * Atomic table to be used as basis to create specialized tables.
 *
 * @returns
 */
export const PaginableTable = ({
  columnsConfiguration,
  data,
  pageSizes,
  initialState,
  ...uiProps
}) => {
  const pageSizeSorted = pageSizes.sort((a, b) => {
    return a - b;
  });

  const {
    getTableProps,
    getTableBodyProps,
    columns,
    page,
    prepareRow,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
    visibleColumns,
  } = useTable(
    {
      columns: columnsConfiguration,
      data: data,
      initialState: {
        pageIndex: 0,
        pageSize: pageSizeSorted[0],
        ...initialState,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Number of elements to control what will be rendered (e.g., pagination)
  const isPaginationRequired = data.length > pageSizeSorted[0];

  // Checking for global filters
  let globalFilterComponent = null;
  let { globalFilter: globalFilterFnc } = uiProps;

  if (globalFilterFnc && isPaginationRequired) {
    globalFilterComponent = globalFilterFnc(
      globalFilter,
      preGlobalFilteredRows,
      setGlobalFilter
    );
  }

  return (
    <>
      <BaseTable
        rows={page}
        columns={visibleColumns}
        prepareRow={prepareRow}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        selectable={false}
        sortable={true}
        {...{ ...uiProps, globalFilter: globalFilterComponent }}
      />

      {isPaginationRequired && (
        <>
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
                options={pageSizes.map((v) => ({
                  key: v,
                  text: v,
                  value: v,
                }))}
              />
            </Grid.Column>
          </Grid>
          <Grid centered columns={1}>
            <Pagination
              size="mini"
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
        </>
      )}
    </>
  );
};

PaginableTable.propTypes = {
  columnsConfiguration: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  uiProps: PropTypes.object,
};

PaginableTable.defaultProps = {
  pageSizes: [5, 10, 20, 30, 40, 50],
};

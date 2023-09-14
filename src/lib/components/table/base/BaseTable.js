/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Table } from 'semantic-ui-react';

/**
 * Atomic table to be used as basis to create specialized tables.
 *
 * @returns
 */
export const BaseTable = ({
  columns,
  rows,
  prepareRow,
  getTableProps,
  getTableBodyProps,
  globalFilter,
  ...uiProps
}) => {
  return (
    <Table {...uiProps} {...getTableProps()}>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.HeaderCell
              sorted={
                column.isSorted
                  ? column.isSortedDesc
                    ? 'descending'
                    : 'ascending'
                  : null
              }
              {...column.getHeaderProps(
                column.getSortByToggleProps ? column.getSortByToggleProps() : {}
              )}
            >
              {column.render('Header')}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      {globalFilter && (
        <Table.Row>
          <Table.HeaderCell colSpan={columns.length}>
            {globalFilter}
          </Table.HeaderCell>
        </Table.Row>
      )}

      <Table.Body {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Table.Row {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Table.Cell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

BaseTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  prepareRow: PropTypes.func,
  getTableProps: PropTypes.func,
  getTableBodyProps: PropTypes.func,
  uiProps: PropTypes.object,
};

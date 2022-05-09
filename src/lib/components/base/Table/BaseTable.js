/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Table } from 'semantic-ui-react';

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
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              {column.render('Header')}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

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

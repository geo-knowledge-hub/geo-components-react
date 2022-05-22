/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import { BaseTable } from './BaseTable';

import { render, screen } from '../../../../setupTestRenders';

import tabelData from '../../../../mocks/table/table-data.json';

const ComponentTemplate = (args) => {
  const tableRows = useMemo(() => tabelData);
  const tableColumns = useMemo(() => {
    return [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
    ];
  });

  const { getTableProps, getTableBodyProps, rows, columns, prepareRow } =
    useTable({
      columns: tableColumns,
      data: tableRows,
    });

  return (
    <BaseTable
      columns={columns}
      rows={rows}
      getTableProps={getTableProps}
      getTableBodyProps={getTableBodyProps}
      prepareRow={prepareRow}
      {...args}
    />
  );
};

describe('BaseTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(<ComponentTemplate />);

      const tableElement = screen.getByRole('table');
      expect(tableElement).toBeInTheDocument();
    });
  });
});

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';

import { PaginableTable } from './PaginableTable';

import { render, screen } from '../../../../setupTestRenders';

import tableData from '../../../../mocks/table/table-data.json';

const ComponentTemplate = (args) => {
  const tableRows = useMemo(() => tableData);
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

  return (
    <PaginableTable
      columnsConfiguration={tableColumns}
      data={tableRows}
      {...args}
    />
  );
};

describe('PaginableTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(<ComponentTemplate />);

      const tableElement = screen.getByRole('table');
      expect(tableElement).toBeInTheDocument();
    });
  });
});

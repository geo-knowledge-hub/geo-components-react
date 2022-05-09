/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

import { SortableTable } from './SortableTable';

it('renders without crashing without props', () => {
  const div = document.createElement('div');

  const MockComponent = () => {
    // Table configurations
    const baseTableColumnsExample = useMemo(() => {
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

    const baseTableDataExample = useMemo(
      () => [
        {
          name: 'Name A',
          role: 'Role A',
          type: 'Type A',
        },
        {
          name: 'Name B',
          role: 'Role B',
          type: 'Type C',
        },
      ],
      []
    );

    return (
      <SortableTable
        columnsConfiguration={baseTableColumnsExample}
        data={baseTableDataExample}
      />
    );
  };

  ReactDOM.render(MockComponent, div);
});

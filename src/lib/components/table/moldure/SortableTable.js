/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useTable, useSortBy } from 'react-table';

import { BaseTable } from '../base';

/**
 * Atomic table to be used as basis to create specialized tables.
 *
 * @returns
 */
export const SortableTable = ({ columnsConfiguration, data, ...uiProps }) => {
  const { getTableProps, getTableBodyProps, columns, rows, prepareRow } =
    useTable(
      {
        columns: columnsConfiguration,
        data: data,
      },
      useSortBy
    );

  return (
    <BaseTable
      rows={rows}
      columns={columns}
      prepareRow={prepareRow}
      getTableProps={getTableProps}
      getTableBodyProps={getTableBodyProps}
      selectable={true}
      sortable={true}
    />
  );
};

SortableTable.propTypes = {
  columnsConfiguration: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  uiProps: PropTypes.object,
};

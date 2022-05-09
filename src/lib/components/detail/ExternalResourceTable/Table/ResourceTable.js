/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import { PaginableTable } from '../../../base';

export const ResourceTable = ({ tableData }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Relation Type',
        accessor: 'relation_type.title.en',
      },
      {
        Header: 'Resource Type',
        accessor: 'resource_type.title.en',
      },
    ];
  });

  const tableDataMemoized = useMemo(() => tableData);

  return (
    <>
      <PaginableTable
        unstackable
        fixed={true}
        padded={true}
        collapsing={true}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
      />
    </>
  );
};

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import { PaginableTable } from '../../moldure';

import regeneratorRuntime from 'regenerator-runtime';
import { useAsyncDebounce } from 'react-table';

import { Grid, Button, Icon, Input } from 'semantic-ui-react';


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
      placeholder="Search..."
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    >
      <input />
      <Icon name="search" />
    </Input>
  );
}

/**
 * External resource table.
 */
export const ExternalResourceTable = ({ tableData }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Relation Type',
        accessor: 'relation_type.title_l10n',
      },
      {
        Header: 'Resource Type',
        accessor: 'resource_type.title_l10n',
      },
      {
        Header: () => null,
        id: 'access-button',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          return (
            <Grid stackable columns={2}>
              <Grid.Row fluid stretched>
                <Grid.Column width={8}>
                  <Button
                    animated
                    content="Access"
                    as="a"
                    size="mini"
                    target="_blank"
                    href={rowData.identifier}
                  >
                    <Button.Content visible>
                      <Icon name="external alternate" />
                    </Button.Content>
                    <Button.Content hidden>Access</Button.Content>
                  </Button>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Button
                    animated
                    as="a"
                    size="mini"
                    onClick={() => {
                      navigator.clipboard.writeText(rowData.identifier);
                    }}
                  >
                    <Button.Content visible>
                      <Icon name="copy outline" />
                    </Button.Content>
                    <Button.Content hidden>Copy</Button.Content>
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
    <>
      <PaginableTable
        unstackable
        fixed={true}
        padded={true}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
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
      />
    </>
  );
};

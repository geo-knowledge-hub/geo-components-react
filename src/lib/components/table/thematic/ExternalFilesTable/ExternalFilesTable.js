/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';

import { BaseGlobalFilter } from '../../base';
import { PaginableTable } from '../../moldure';

import _get from 'lodash/get';
import _isNil from 'lodash/isNil';

import regeneratorRuntime from 'regenerator-runtime';
import { useAsyncDebounce } from 'react-table';

import { Grid, Button, Icon, Header, Dropdown, Label } from 'semantic-ui-react';

import './ExternalFilesTable.css';

/**
 * External files table.
 */
export const ExternalFilesTable = ({ tableData, tableConfig }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      // Defining invisible columns that are used as the index for the table filter
      {
        Header: () => null,
        id: 'idx_key',
        accessor: 'key',
      },
      {
        Header: () => null,
        id: 'idx_mimetype',
        accessor: 'mimetype',
      },
      {
        Header: () => null,
        id: 'idx_metadata',
        accessor: 'metadata',
      },
      // Content column
      {
        Header: () => null,
        id: 'external-files-table',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          // Preparing data
          // Provider
          const rowSource = _get(rowData, 'source');

          // Name, checksum and size
          const rowKey = _get(rowData, 'key');
          const rowSize = _get(rowData, 'size');
          const rowChecksum = _get(rowData, 'checksum');

          // Download and preview URL
          const rowPreviewUrl = _get(rowData, 'url_preview');
          const rowDownloadUrl = _get(rowData, 'url_download');

          return (
            <Grid>
              <Grid.Row verticalAlign="middle">
                <Grid.Column
                  widescreen={12}
                  largeScreen={12}
                  computer={12}
                  tablet={16}
                  mobile={16}
                >
                  <div>
                    <Label size={'tiny'}>Source: {rowSource}</Label>
                    <Label size={'tiny'}>Provision: Source-dependent</Label>
                  </div>

                  <Grid className={'user-stories-metadata'}>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <div className={'truncated file-key'}>
                          <a href={rowDownloadUrl} target={'_blank'}>
                            {rowKey}
                          </a>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <small className="ui text-muted font-tiny">
                          {rowChecksum}
                          <div
                            className="ui icon inline-block"
                            data-tooltip="This is the file fingerprint (checksum), which can be used to verify the file integrity."
                          >
                            <i className="question circle checksum icon"></i>
                          </div>
                        </small>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column
                  widescreen={4}
                  largeScreen={4}
                  computer={4}
                  only={'computer'}
                >
                  <Button.Group size={'mini'} floated={'right'}>
                    {!_isNil(rowPreviewUrl) && (
                      <Button
                        content={'Access'}
                        as={'a'}
                        size={'mini'}
                        target={'_blank'}
                        disabled={_isNil(rowPreviewUrl)}
                        href={rowPreviewUrl}
                      >
                        <Icon name={'external'} /> Preview
                      </Button>
                    )}

                    <Button
                      content={'Access'}
                      as={'a'}
                      size={'mini'}
                      target={'_blank'}
                      disabled={_isNil(rowDownloadUrl)}
                      href={rowDownloadUrl}
                    >
                      <Icon name={'download'} /> Download
                    </Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row only={'mobile tablet'} className={'mt-0'}>
                <Grid.Column className={'pt-0'}>
                  <Grid stackable>
                    <Grid.Row>
                      <Grid.Column className={'pt-0'}>
                        <Dropdown
                          icon={'caret square down outline'}
                          floating
                          button
                          labeled
                          fluid
                          text={'Options'}
                          className={'icon right floated tiny'}
                        >
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href={rowPreviewUrl}
                              target={'_blank'}
                            >
                              <p>
                                <Icon name={'external alternate'} /> Preview
                              </p>
                            </Dropdown.Item>

                            <Dropdown.Item
                              href={rowDownloadUrl}
                              target={'_blank'}
                            >
                              <p>
                                <Icon name={'cloud download'} /> Download
                              </p>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
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
    <div className={'table-external-files'}>
      <PaginableTable
        unstackable
        fixed={true}
        padded={true}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
        initialState={{
          hiddenColumns: ['idx_key', 'idx_mimetype', 'idx_metadata'],
          sortBy: [
            {
              id: 'idx_key',
              desc: true,
            },
          ],
        }}
        globalFilter={(
          globalFilter,
          preGlobalFilteredRows,
          setGlobalFilter
        ) => (
          <BaseGlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            preGlobalFilteredRows={preGlobalFilteredRows}
          />
        )}
        showHeader={false}
        {...tableConfig}
      />
    </div>
  );
};

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import { PaginableTable } from '../../moldure';
import { YouTubeViewer, isUrlFromYouTube } from './youtube';

import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _truncate from 'lodash/truncate';

import regeneratorRuntime from 'regenerator-runtime';
import { useAsyncDebounce } from 'react-table';

import {
  Grid,
  Button,
  Icon,
  Input,
  Header,
  Label,
  Dropdown,
} from 'semantic-ui-react';

import './ExternalResourceTable.css';

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
      placeholder={'Type to search...'}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    >
      <input />
      <Icon name={'search'} />
    </Input>
  );
}

/**
 * External resource table.
 */
export const ExternalResourceTable = ({ tableData, tableConfig }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      // Defining invisible columns that are used as the index for the table filter
      {
        Header: () => null,
        id: 'idx_title',
        accessor: 'title',
      },
      {
        Header: () => null,
        id: 'idx_relation_type',
        accessor: 'relation_type.title_l10n',
      },
      {
        Header: () => null,
        id: 'idx_resource_type',
        accessor: 'resource_type.title_l10n',
      },
      {
        Header: () => null,
        id: 'idx_scheme',
        accessor: 'scheme',
      },
      // Content column
      {
        Header: () => null,
        id: 'external-resources-table',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          // Preparing data
          // Title and description
          const rowTitle = _get(rowData, 'title');
          const rowDescription = _get(rowData, 'description');

          // URL and Identifier
          const rowUrl = _truncate(_get(rowData, 'url'), {
            length: 120,
            omission: '...',
          });

          const rowIdentifier = _truncate(_get(rowData, 'identifier'), {
            length: 120,
            omission: '...',
          });

          // Checking youtube video
          const rowIsYoutubeVideo = isUrlFromYouTube(rowUrl);

          // Resource Type and Relation Type
          const rowResourceType = _get(rowData, 'resource_type.title_l10n');
          const rowRelationType = _get(rowData, 'relation_type.title_l10n');

          return (
            <Grid>
              <Grid.Row verticalAlign="middle">
                <Grid.Column
                  widescreen={13}
                  largeScreen={13}
                  computer={13}
                  tablet={16}
                  mobile={16}
                >
                  <div>
                    {rowRelationType && (
                      <Label size={'tiny'}>Relation: {rowRelationType}</Label>
                    )}
                    {rowResourceType && (
                      <Label size={'tiny'}>
                        Resource type: {rowResourceType}
                      </Label>
                    )}
                  </div>

                  <Grid className={'user-stories-metadata'}>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Header>{rowTitle}</Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <p className="content-description">
                          {rowDescription || rowUrl || rowIdentifier}
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column
                  widescreen={3}
                  largeScreen={3}
                  computer={3}
                  only={'computer'}
                >
                  <Button.Group size={'mini'} floated={'right'}>
                    {rowIsYoutubeVideo && <YouTubeViewer url={rowUrl} />}
                    <Button
                      animated
                      content={'Access'}
                      as={'a'}
                      size={'mini'}
                      target={'_blank'}
                      disabled={_isNil(rowUrl)}
                      href={rowUrl}
                    >
                      <Button.Content visible>
                        <Icon name="external alternate" />
                      </Button.Content>
                      <Button.Content hidden>Access</Button.Content>
                    </Button>
                    <Button
                      animated
                      as={'a'}
                      size={'mini'}
                      onClick={() => {
                        navigator.clipboard.writeText(rowUrl || rowIdentifier);
                      }}
                    >
                      <Button.Content visible>
                        <Icon name={'copy outline'} />
                      </Button.Content>
                      <Button.Content hidden>Copy</Button.Content>
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
                            {rowIsYoutubeVideo && (
                              <YouTubeViewer
                                fluid
                                url={rowUrl}
                                content={'Watch'}
                                as={Dropdown.Item}
                                icon={'youtube'}
                              />
                            )}

                            <Dropdown.Item href={rowUrl} target={'_blank'}>
                              <p>
                                <Icon name={'external alternate'} /> Access
                              </p>
                            </Dropdown.Item>

                            <Dropdown.Item
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  rowUrl || rowIdentifier
                                );
                              }}
                            >
                              <p>
                                <Icon name={'copy outline'} /> Copy
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
    <div className={'table-external-resources'}>
      <PaginableTable
        unstackable
        fixed={true}
        padded={true}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
        initialState={{
          hiddenColumns: [
            'idx_title',
            'idx_relation_type',
            'idx_resource_type',
            'idx_scheme',
          ],
        }}
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
        showHeader={false}
        {...tableConfig}
      />
    </div>
  );
};

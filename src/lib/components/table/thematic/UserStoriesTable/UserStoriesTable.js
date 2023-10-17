/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { PaginableTable } from '../../moldure';

import _get from 'lodash/get';

import { Icon, Grid, Button, Header } from 'semantic-ui-react';

import './UserStoriesTable.css';

/**
 * Users Stories table.
 */
export const UserStoriesTable = ({ tableData, packageId }) => {
  const tableColumnsDefinition = useMemo(() => {
    return [
      {
        Header: () => null,
        id: 'users-stories-version',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          const rowTitle = _get(rowData, 'metadata.title', 'No title');
          const rowDate = _get(rowData, 'ui.created_date_l10n_long', 'No date');
          const rowUrl = _get(rowData, 'links.self_html');

          // Customizing the url
          const rowCompleteUrl = `${rowUrl}?package=${packageId}`

          return (
            <Grid>
              <Grid.Row verticalAlign="middle">
                <Grid.Column
                  widescreen={1}
                  largeScreen={1}
                  computer={1}
                  tablet={1}
                  mobile={3}
                >
                  <Icon name="user" size="big" />
                </Grid.Column>
                <Grid.Column
                  widescreen={12}
                  largeScreen={12}
                  computer={12}
                  tablet={12}
                  mobile={11}
                >
                  <Grid className={'user-stories-metadata'}>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Header>{rowTitle}</Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                      <Grid.Column>{rowDate}</Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column
                  widescreen={3}
                  largeScreen={3}
                  computer={3}
                  tablet={3}
                  mobile={2}
                >
                  <Button
                    icon={'arrow right'}
                    floated={'right'}
                    href={rowCompleteUrl}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        },
      },
    ];
  });

  // Memoizing data
  const tableDataMemoized = useMemo(() => tableData);

  // Defining valid page sizes
  const pageSizes = [3, 5, 10];

  return (
    <>
      <PaginableTable
        unstackable
        fixed={false}
        padded={true}
        pageSizes={pageSizes}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
        className={'users-stories-table'}
      />
    </>
  );
};

UserStoriesTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  packageId: PropTypes.string.isRequired,
};

UserStoriesTable.defaultProps = {
  packageId: "#",
};

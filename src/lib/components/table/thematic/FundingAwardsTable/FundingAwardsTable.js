/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useMemo } from 'react';
import { PaginableTable } from '../../moldure';

import _get from 'lodash/get';
import _head from 'lodash/head';

import regeneratorRuntime from 'regenerator-runtime';
import { useAsyncDebounce } from 'react-table';

import { Grid, Button, Icon, Header, Label, Image } from 'semantic-ui-react';
import _filter from 'lodash/filter';

/**
 * Funding Award Item
 */
const FundingAwardItem = ({
  rowFunder,
  rowNumber,
  rowTitle,
  rowUrl,
  ...props
}) => {
  return (
    <Grid>
      <Grid.Row verticalAlign={'middle'}>
        <Grid.Column
          widescreen={13}
          largeScreen={13}
          computer={13}
          tablet={16}
          mobile={16}
        >
          <div>
            <Label size={'mini'} basic className={'ml-0 mr-5'}>
              {rowFunder}
            </Label>

            <Label size={'mini'} basic className={'ml-0 mr-5'}>
              {rowNumber}
            </Label>
          </div>

          <Grid className={'user-stories-metadata'}>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Header>{rowTitle}</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column width={3} textAlign={'right'} only={'computer'}>
          {rowUrl && (
            <Button.Group size={'mini'} floated={'right'}>
              <Button
                content={'Access'}
                as={'a'}
                size={'mini'}
                href={rowUrl}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                Access
              </Button>
            </Button.Group>
          )}
        </Grid.Column>
      </Grid.Row>

      {rowUrl && (
        <Grid.Row only={'tablet mobile'} className={'pt-0'}>
          <Grid.Column width={16} className={'pt-0'}>
            <Button
              content={'Access'}
              as={'a'}
              size={'mini'}
              href={rowUrl}
              fluid
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              Access
            </Button>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

/**
 * Funding Award Item with Funding Emblem (e.g., EU-related projects)
 */
const FundingAwardItemWithEmblem = ({
  rowFunder,
  rowNumber,
  rowTitle,
  rowUrl,
  rowIcon,
  rowDisclaimer,
  ...props
}) => {
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
            <Label size={'mini'} basic className={'ml-0 mr-5'}>
              {rowFunder}
            </Label>

            <Label size={'mini'} basic className={'ml-0 mr-5'}>
              {rowNumber}
            </Label>

            {rowUrl && (
              <Grid style={{ display: 'inline-flex' }}>
                <Grid.Column only={'computer'}>
                  <a
                    href={rowUrl}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    style={{ marginLeft: '5px' }}
                  >
                    <Icon name={'external alternate'} size={'small'} />
                  </a>
                </Grid.Column>
              </Grid>
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
                <div
                  className={'content-description'}
                  dangerouslySetInnerHTML={{ __html: rowDisclaimer }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column
          widescreen={4}
          largeScreen={4}
          computer={4}
          only={'computer'}
          textAlign={'right'}
        >
          <Image src={rowIcon} size={'medium'} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row only={'tablet'} className={'pt-0'}>
        <Grid.Column width={7} className={'pt-0'} floated={'right'}>
          <Image src={rowIcon} size={'medium'} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row only={'mobile'} className={'pt-0'}>
        <Grid.Column width={16} className={'pt-0'} floated={'right'}>
          <Image src={rowIcon} size={'medium'} />
        </Grid.Column>
      </Grid.Row>

      {rowUrl && (
        <Grid.Row only={'tablet mobile'} className={'pt-0'}>
          <Grid.Column width={16} className={'pt-0'}>
            <Button
              content={'Access'}
              as={'a'}
              size={'mini'}
              href={rowUrl}
              target={'_blank'}
              rel={'noopener noreferrer'}
              fluid
            >
              Access
            </Button>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

/**
 * Table of Records component.
 */
export const FundingAwardsTable = ({ tableData, tableConfig, extraConfig }) => {
  // Get funding emblem from the extra configuration object
  const fundingEmblem = _get(extraConfig, 'eu-funding-logos', []);

  // Memoizing data
  const tableDataMemoized = useMemo(() => tableData);

  // Defining table
  const tableColumnsDefinition = useMemo(() => {
    return [
      // Defining invisible columns that are used as the index for
      // the table filter
      {
        Header: () => null,
        id: 'idx_funder_name',
        accessor: 'funder.name',
      },
      {
        Header: () => null,
        id: 'idx_award_title',
        accessor: 'award.title.en',
      },
      {
        Header: () => null,
        id: 'idx_award_id',
        accessor: 'award.id',
      },
      {
        Header: () => null,
        id: 'idx_award_number',
        accessor: 'award.number',
      },
      // Content column
      {
        Header: () => null,
        id: 'table-funding-awards',
        Cell: ({ row }) => {
          // Getting data
          const { original: rowData } = row;

          // Preparing data
          // Title and number
          const rowTitle = _get(rowData, 'award.title.en');
          const rowNumber = _get(rowData, 'award.number');

          // URL
          const rowUrl = _get(rowData, 'award.identifiers.0.identifier');
          const isUrl = _get(rowData, 'award.identifiers.0.scheme') === 'url';

          // Icon and Disclaimer
          const rowDisclaimer = _get(rowData, 'award.disclaimer');
          const rowIcon = _get(
            _head(
              _filter(fundingEmblem, (emblem) => {
                return _get(emblem, 'id') === _get(rowData, 'award.icon');
              })
            ),
            'logo'
          );

          // Funder
          const rowFunder = _get(rowData, 'funder.name');

          // Define component
          const FundingAwardItemComponent =
            rowIcon && rowDisclaimer
              ? FundingAwardItemWithEmblem
              : FundingAwardItem;

          return (
            <FundingAwardItemComponent
              rowFunder={rowFunder}
              rowNumber={rowNumber}
              rowTitle={rowTitle}
              rowUrl={rowUrl}
              rowIcon={rowIcon}
              rowDisclaimer={rowDisclaimer}
            />
          );
        },
      },
    ];
  });

  return (
    <div className={'table-records'}>
      <PaginableTable
        unstackable
        fixed={true}
        padded={true}
        data={tableDataMemoized}
        columnsConfiguration={tableColumnsDefinition}
        initialState={{
          hiddenColumns: [
            'idx_funder_name',
            'idx_award_title',
            'idx_award_id',
            'idx_award_number',
          ],
        }}
        showHeader={false}
        {...tableConfig}
      />
    </div>
  );
};

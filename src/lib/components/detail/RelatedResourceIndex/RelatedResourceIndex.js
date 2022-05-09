/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useEffect, useMemo, useState } from 'react';

import styled from 'styled-components';
import { useMiniSearch } from 'react-minisearch';
import { Container, Dropdown, Grid } from 'semantic-ui-react';

import { RecordList } from './RecordList';
import { SearchMenu, Pagination } from './Search';
import { IndexContextProvider } from './IndexContext';

import { countRecordByType, paginateRecordItems } from './recordOperations';

/**
 * Constants
 */
const VALID_PAGE_SIZES = [3, 5, 10, 15, 50, 100];

/**
 * Styled components
 */
const StyledContainer = styled(Container)`
  margin-top: 2em;
`;

/**
 * Search definitions
 */
const SEARCH_OPTIONS = {
  idField: 'id',
  fields: ['title', 'description'],
  extractField: (document, fieldName) =>
    fieldName.split('.').reduce((doc, key) => doc && doc[key], document),
  storeFields: ['ui'],
};

/**
 * Faceted Search filter function.
 * @param {Object} facetedSearchOptions Faceted Search Options
 */
const facetedFilter = (facetedSearchOptions) => {
  return (result) => {
    let isValid = false;

    if (
      result.ui.resource_type.title_l10n === facetedSearchOptions.resourceType
    ) {
      isValid = true;
    }

    return isValid;
  };
};

/**
 * Index component to search related resource objects
 * from a list of values.
 */
export const RelatedResourceIndex = ({ records, resourceTypeDefinitions }) => {
  // search state
  const [paginationConfig, setPaginationConfig] = useState({
    currentPage: 1,
    pageSize: 3,
  });
  const [searchBarContent, setSearchBarContent] = useState('');
  const [activeResourceType, setActiveResourceType] = useState('Dataset');

  // preparing the context
  const recordTypeCount = useMemo(
    () => countRecordByType(records, resourceTypeDefinitions),
    []
  );

  // indexing the records
  const { search, searchResults } = useMiniSearch(records, SEARCH_OPTIONS);
  useEffect(() => {
    search(searchBarContent);
  }, [searchBarContent, activeResourceType]);

  // controlling the pagination state when a search is performed
  useEffect(() => {
    setPaginationConfig({ ...paginationConfig, currentPage: 1 });
  }, [searchBarContent]);

  // selecting the records data
  const recordsDataRaw = searchBarContent ? searchResults : records;
  const recordsData = recordsDataRaw.filter(
    facetedFilter({ resourceType: activeResourceType })
  );

  // paginating
  const recordsDataPaginated = paginateRecordItems(
    recordsData,
    paginationConfig.currentPage,
    paginationConfig.pageSize
  );

  return (
    <StyledContainer>
      <IndexContextProvider
        value={{
          searchContext: {
            index: { search, results: recordsDataPaginated.data },
            searchbar: {
              content: searchBarContent,
              setContent: setSearchBarContent,
            },
            faceted: {
              resourceType: {
                activeResourceType,
                setActiveResourceType,
              },
            },
            pagination: {
              status: recordsDataPaginated,
              setPagionationPage: (currentPage) =>
                setPaginationConfig({
                  ...paginationConfig,
                  currentPage: currentPage,
                }),
            },
          },
          resourceTypeMenuContext: {
            recordTypeCount,
          },
          records: {
            data: records,
          },
        }}
      >
        <SearchMenu size={'mini'} />
        <RecordList />

        <Grid>
          <Grid.Column>
            <Dropdown
              item
              simple
              text={`Page size: ${paginationConfig.pageSize}`}
              direction={'right'}
              onChange={(_, data) => {
                setPaginationConfig({
                  ...paginationConfig,
                  pageSize: data.value,
                });
              }}
              options={VALID_PAGE_SIZES.map((v) => ({
                key: v,
                text: v,
                value: v,
              }))}
            />
          </Grid.Column>
        </Grid>

        <Grid centered columns={1}>
          <Pagination />
        </Grid>
      </IndexContextProvider>
    </StyledContainer>
  );
};

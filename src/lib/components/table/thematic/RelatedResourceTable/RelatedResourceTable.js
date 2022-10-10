/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import {
  Container,
  Dropdown,
  Grid,
  Accordion,
  Transition,
} from 'semantic-ui-react';
import styled from '@emotion/styled';

import { useMiniSearch } from 'react-minisearch';

import { IndexContextProvider } from './IndexContext';
import { RecordList, SearchMenu, Pagination, TypeSelectorCard } from './search';

import { paginateRecordItems } from './operations/search';
import {
  countRecordByType,
  facetedFilterRecordsFactory,
} from './operations/record';

/**
 * Constants
 */
const SEARCH_OPTIONS = {
  idField: 'id',
  fields: ['title', 'description'],
  extractField: (document, fieldName) =>
    fieldName.split('.').reduce((doc, key) => doc && doc[key], document),
  storeFields: ['metadata'],
};

/**
 * Styled Components
 */
const StyledContainer = styled(Container)`
  margin-top: 2em;
`;

/**
 * Index component to search related resource objects
 * from a list of values.
 */
export const RelatedResourceTable = ({
  records,
  resourceTypeDefinitions,
  paginationSizes,
  transitionProps,
}) => {
  // search state
  const [paginationConfig, setPaginationConfig] = useState({
    currentPage: 1,
    pageSize: 3,
  });
  const [searchBarContent, setSearchBarContent] = useState('');
  const [activeResourceType, setActiveResourceType] = useState(null);

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
  }, [searchBarContent, activeResourceType, paginationConfig.pageSize]);

  // selecting the records data
  const recordsDataRaw = searchBarContent ? searchResults : records;
  const recordsData = recordsDataRaw.filter(
    facetedFilterRecordsFactory({
      resourceType: activeResourceType,
      resourceTypesAvailable: resourceTypeDefinitions,
    })
  );

  // paginating
  const recordsDataPaginated = paginateRecordItems(
    recordsData,
    paginationConfig.currentPage,
    paginationConfig.pageSize
  );

  // checking if the sidebar is visible
  const isCheckbarVisible = activeResourceType !== null;

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
        <TypeSelectorCard />

        <Accordion>
          <Accordion.Title active={true} icon={''}></Accordion.Title>
          <Accordion.Content active={true}>
            <Transition visible={isCheckbarVisible} {...transitionProps}>
              <div>
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
                      options={paginationSizes.map((v) => ({
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
              </div>
            </Transition>
          </Accordion.Content>
        </Accordion>
      </IndexContextProvider>
    </StyledContainer>
  );
};

RelatedResourceTable.propTypes = {
  records: PropTypes.array.isRequired,
  paginationSizes: PropTypes.array,
  transitionProps: PropTypes.object,
};

RelatedResourceTable.defaultProps = {
  paginationSizes: [3, 5, 10, 15, 50, 100],
  transitionProps: {
    type: 'fade down',
    duration: { show: 750, hide: 1000 },
  },
};

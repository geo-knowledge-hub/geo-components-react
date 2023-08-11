/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import { Grid, Loader } from 'semantic-ui-react';

import { mutateVocabularyData } from '../base/mutations';
import {
  ComputerContainer,
  MobileContainer,
  TabletContainer,
} from '../moldure';
import { fetchVocabulary } from '../../../resources';

//
// Components
//

export const EngagementCarousel = ({
  filterUrl,
  vocabularyType,
  staleTime,
}) => {
  // Hooks
  const { data: topics, isFetching: isFetchingTopics } = useQuery({
    queryKey: ['carousel-topics'],
    queryFn: () => {
      return fetchVocabulary(vocabularyType, {
        q: 'props.is_subtype:"false" AND (NOT props.engagement_type:convention)',
        size: 30, // We don't have a lot of engagement priorities to handle
      }).then((data) => {
        return data
          .filter((row) => {
            return !!row.props.icon;
          })
          .map((row) => mutateVocabularyData(row, filterUrl));
      });
    },
    staleTime,
  });

  const {
    data: completeData,
    isIdle,
    isFetching: isFetchingSubtopics,
  } = useQuery({
    queryKey: ['carousel-subtopics'],
    queryFn: async () => {
      return await Promise.all(
        topics.map(async (row) => {
          if (row.hasSubElements) {
            // Preparing query
            let queryString = `props.subtype:${row.id}`;

            // This is required as sdg has multiple levels of subtypes
            if (row.id.includes('sdg')) {
              queryString =
                'props.is_subtype:"true" AND props.subtype:"sdg-goal"';
            }

            const subTopicsData = await fetchVocabulary(vocabularyType, {
              q: queryString,
              size: 30,
            });

            row.subElements = subTopicsData.map((row) =>
              mutateVocabularyData(row, filterUrl)
            );

            return row;
          }

          return row;
        })
      );
    },
    staleTime,
    enabled: !!topics,
  });

  const isInProgress = isIdle || isFetchingTopics || isFetchingSubtopics;

  return (
    <>
      {isInProgress ? (
        <Loader />
      ) : (
        <Grid>
          <MobileContainer elements={completeData} />
          <TabletContainer elements={completeData} />
          <ComputerContainer elements={completeData} />
        </Grid>
      )}
    </>
  );
};

EngagementCarousel.propTypes = {
  filterUrl: PropTypes.string.isRequired,
  vocabularyType: PropTypes.string.isRequired,
  staleTime: PropTypes.number,
};

EngagementCarousel.defaultProps = {
  staleTime: 300000, // 5 minutes
  vocabularyType: 'engagementprioritiestypes',
};

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@emotion/react';
import { Segment, Sidebar } from 'semantic-ui-react';

import { SegmentSidebar } from './Sidebar';

import { fetchVocabulary } from '../../../../../resources';
import { engagementPriorityQueryString } from '../recordOperations';
import { EngagementPrioritiesCarousel } from '../EngagementPrioritiesCarousel';

/**
 * Constants
 */
const ENGAGEMENT_PRIORITIES_VOCABULARY_NAME = 'engagementprioritiestypes';

/**
 * Carousel component to present Engagement Priorities logo with
 * nested carousel support.
 *
 * @param {object} nestedCarouselContainerProps - An object with the ``sidebar`` props. The sidebar modified
 *                                with this props is used to store the nested carousel.
 */
export const EngagementPrioritiesNestedCarousel = ({
  mainCarouselProps,
  nestedCarouselProps,
  nestedCarouselContainerProps,
  dataProxyProcessor,
}) => {
  const componentTheme = useTheme();

  const [isToOverflow, setIsToOverflow] = useState(false);

  const [subTypeSelected, setSubTypeSelected] = useState(null);

  const [vocabulariesData, setVocabulariesData] = useState([]);
  const [subTypeVocabulariesData, setSubTypeVocabulariesData] = useState({});

  // getting data from Vocabulary API (only supertypes)
  useEffect(() => {
    fetchVocabulary(ENGAGEMENT_PRIORITIES_VOCABULARY_NAME, {
      params: {
        q: 'props.is_subtype:"false"',
        size: 25, // temporary
      },
    }).then((vocabularyData) => {
      const vocabularyDataFiltered =
        vocabularyData.filter(
          (x) => !(['', null].indexOf(x.props.icon) > -1)
        ) || [];

      // Temporary
      setVocabulariesData(
        dataProxyProcessor
          ? dataProxyProcessor(vocabularyDataFiltered)
          : vocabularyDataFiltered
      );
    });
  }, []);

  // getting data from Vocabulary API (subtype selected by the users)
  useEffect(() => {
    if (subTypeSelected === null) return;

    const dataAlreadyLoaded =
      subTypeVocabulariesData[subTypeSelected] !== undefined;

    if (!dataAlreadyLoaded) {
      fetchVocabulary(ENGAGEMENT_PRIORITIES_VOCABULARY_NAME, {
        params: {
          q: `props.is_subtype:"true" AND props.subtype:"${subTypeSelected}"`,
          size: 25, // temporary
        },
      }).then((vocabularyData) => {
        setSubTypeVocabulariesData({
          ...subTypeVocabulariesData,
          [subTypeSelected]: dataProxyProcessor
            ? dataProxyProcessor(vocabularyData) // Temporary
            : vocabularyData,
        });
      });
    }
  }, [subTypeSelected]);

  return (
    <Fragment>
      <Sidebar.Pushable style={{ overflow: 'hidden' }}>
        <SegmentSidebar
          visible={subTypeSelected !== null}
          onHide={() => {
            setSubTypeSelected(null);
          }}
          onHidden={() => {
            setIsToOverflow(false);
            setSubTypeSelected(null);
          }}
          onVisible={() => {
            setIsToOverflow(true);
          }}
          {...nestedCarouselContainerProps}
        >
          <div
            className={componentTheme.carousels.sidebarCarousel}
            visible={isToOverflow.toString()}
          >
            <EngagementPrioritiesCarousel
              engagementPriorities={
                subTypeVocabulariesData[subTypeSelected] || []
              }
              cardProps={{
                onClick: (event, data) => {
                  const selectedObject =
                    subTypeVocabulariesData[subTypeSelected][data.index];

                  document.location.href = engagementPriorityQueryString(
                    selectedObject.id
                  );
                },
                header: null,
              }}
              carouselProviderProps={nestedCarouselProps}
            />
          </div>
        </SegmentSidebar>

        <Sidebar.Pusher>
          <EngagementPrioritiesCarousel
            engagementPriorities={vocabulariesData}
            cardProps={{
              onClick: (event, data) => {
                const selectedObject = vocabulariesData[data.index];

                const selectCardType = selectedObject.props.type;
                const hasSubType = JSON.parse(selectedObject.props.has_subtype);

                // enabling the sidebar with the subtype carousel.
                if (hasSubType) {
                  setSubTypeSelected(selectCardType);
                } else {
                  document.location.href = engagementPriorityQueryString(
                    selectedObject.id
                  );
                }
              },
              header: null,
            }}
            carouselProviderProps={mainCarouselProps}
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Fragment>
  );
};

EngagementPrioritiesNestedCarousel.propTypes = {
  mainCarouselProps: PropTypes.object,
  nestedCarouselProps: PropTypes.object,
  nestedCarouselContainerProps: PropTypes.object,
  dataProxyProcessor: PropTypes.func,
};

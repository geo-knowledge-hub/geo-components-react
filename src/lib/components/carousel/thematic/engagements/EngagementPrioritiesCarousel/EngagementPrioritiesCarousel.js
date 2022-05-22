/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import natsort from 'natsort';

import { ImageCarousel } from '../../../moldure';
import { engagementPriorityQueryString } from '../recordOperations';

/**
 * @name EngagementPrioritiesCarousel
 * @description Thematic Carousel to present a set of Engagement Priorities logo. The logos are
 *              sorted based on
 *
 * @param engagementPriorities Array with the engagement priorities image objects to be
 *        presented in the carousel.
 *
 * @param sort boolean flag to indicate the image must be sorted. When this tag is ``true``
 *        the images are sorted using a natural algorithm based on the image ``id``.
 *
 * @param imageCarouselProps Object with the ``ImageCarousel`` component props.
 */
export const EngagementPrioritiesCarousel = ({
  engagementPriorities,
  ...imageCarouselProps
}) => {
  // sorting the data and removing empty/null values.
  const natsorter = natsort({ insensitive: true });
  const recordEngagementSorted = engagementPriorities
    .sort((a, b) => natsorter(a.id, b.id))
    .filter((x) => !(['', null].indexOf(x.props.icon) > -1));

  return (
    <ImageCarousel
      {...imageCarouselProps}
      imageItems={recordEngagementSorted}
      cardProps={{
        ...{
          onClick: (event, data) => {
            const selectedObject = recordEngagementSorted[data.index];

            document.location.href = engagementPriorityQueryString(
              selectedObject.id
            );
          },
          ...(imageCarouselProps.cardProps || {}),
        },
      }}
    />
  );
};

EngagementPrioritiesCarousel.propTypes = {
  engagementPriorities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      props: PropTypes.shape({
        icon: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.shape({
        en: PropTypes.string,
      }),
    })
  ).isRequired,
  imageCarouselProps: PropTypes.object,
};

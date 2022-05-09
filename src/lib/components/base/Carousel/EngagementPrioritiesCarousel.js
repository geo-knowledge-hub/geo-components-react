/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Glider from 'react-glider';

/**
 * @name EngagementPrioritiesCarousel
 * @description Component to create image carousel using vocabulary-controlled
 *              engagement priorities.
 *
 * @note This component assumes that the engagement priorities labels
 *       are implemented based on the subjects. In the future, this will be
 *       change.
 */
export class EngagementPrioritiesCarousel extends Component {
  render() {
    const {
      gliderProps,
      engagementPriorities,
      carouselImageClass,
      carouselContainerClass,
    } = this.props;

    return (
      <Glider {...gliderProps}>
        {engagementPriorities.map((engagementPriority) => {
          return (
            <a
              key={engagementPriority.id}
              href={`/search?q=metadata.engagement_priorities.id:${engagementPriority.id}&l=list&p=1&s=10&sort=newest`}
            >
              <div className={`glider-slide ${carouselContainerClass}`}>
                <img
                  src={engagementPriority.props.icon}
                  className={carouselImageClass}
                />
              </div>
            </a>
          );
        })}
      </Glider>
    );
  }
}

EngagementPrioritiesCarousel.propTypes = {
  gliderProps: PropTypes.object,
  engagementPriorities: PropTypes.array,

  carouselImageClass: PropTypes.string,
  carouselContainerClass: PropTypes.string,
};

EngagementPrioritiesCarousel.defaultProps = {
  gliderProps: {
    draggable: true,
    dragVelocity: 3,
    hasDots: true,
    hasArrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    duration: 1.5,
    iconLeft: '«',
    iconRight: '»',
  },

  engagementPriorities: [],

  carouselImageClass: 'carousel-image',
  carouselContainerClass: 'carousel-container',
};

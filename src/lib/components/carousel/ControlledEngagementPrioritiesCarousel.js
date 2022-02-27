/*
 * This file is part of GEO-Labels-React.
 * Copyright (C) 2022 CERN.
 *
 * GEO-Labels-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import "glider-js/glider.min.css";
import Glider from 'react-glider';

/**
 * Component to create image carousel using vocabulary-controlled
 * engagement priorities.
 *
 * Note: This component assumes that the engagement priorities labels
 * are implemented based on the subjects. In the future, this will be
 * change.
 */
export class ControlledEngagementPrioritiesCarousel extends Component {
  render() {
    const {
      glinderProps,
      engagementPriorities,
      carouselImageClass,
      carouselContainerClass,
    } = this.props;

    return (
      <Glider {...glinderProps}>
        {engagementPriorities.map((engagementPriority) => {
          return (
            <a
              key={engagementPriority.id}
              href={`/search?q=metadata.subjects.id:${engagementPriority.id}&l=list&p=1&s=10&sort=newest`}
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

ControlledEngagementPrioritiesCarousel.propTypes = {
  glinderProps: PropTypes.object,
  engagementPriorities: PropTypes.array,

  carouselImageClass: PropTypes.string,
  carouselContainerClass: PropTypes.string,
};

ControlledEngagementPrioritiesCarousel.defaultProps = {
  glinderProps: {
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

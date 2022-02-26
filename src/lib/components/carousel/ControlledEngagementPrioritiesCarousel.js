/*
 * This file is part of GEO-Labels-React.
 * Copyright (C) 2022 CERN.
 *
 * GEO-Labels-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

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
    const { glinderProps, engagementPriorities, carouselImageClass } =
      this.props;

    return (
      <Glider {...glinderProps}>
        {engagementPriorities.map((engagementPriority) => {
          return (
            <a
              href={`/search?q=metadata.subjects.id:${engagementPriority.id}&l=list&p=1&s=10&sort=newest`}
            >
              <div class="slide">
                <img
                  src={engagementPriority.props.icon}
                  class={carouselImageClass}
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
};

ControlledEngagementPrioritiesCarousel.defaultProps = {
  engagementPriorities: [],
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
  carouselImageClass: 'carousel-image',
};

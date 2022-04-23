/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Card } from 'semantic-ui-react';
import { Slider, CarouselProvider } from 'pure-react-carousel';

import { CardSlide } from './CardSlide';
import { CardDotGroup } from './CardDotGroup';

/**
 * @name UserStoriesCarousel
 * @summary User Story Carousel.
 *
 */
export const UserStoriesCarousel = ({
  userStories,
  carouselProps,
  cardGroupProps,
  cardCarouselProps,
}) => (
  <CarouselProvider {...carouselProps}>
    <Slider>
      {userStories.map((userStory, index) => (
        <CardSlide
          key={index}
          index={index}
          content={
            <>
              <Card.Content description={userStory.title} />
              <Card.Content extra>
                <a href={userStory.url} rel="noopener noreferrer">
                  <Icon name="basic circular plus circle" />
                  See more
                </a>
              </Card.Content>
            </>
          }
          {...cardCarouselProps}
        />
      ))}
    </Slider>

    <CardDotGroup {...cardGroupProps} />
  </CarouselProvider>
);

UserStoriesCarousel.propTypes = {
  userStories: PropTypes.array.isRequired,
  carouselProps: PropTypes.object,
  cardGroupProps: PropTypes.object,
  cardCarouselProps: PropTypes.object,
};

UserStoriesCarousel.defaultProps = {
  userStories: [],

  carouselProps: {
    naturalSlideWidth: 1,
    naturalSlideHeight: 0.3,
    totalSlides: 4,
    style: {
      width: '500px',
    },
  },

  cardGroupProps: {
    slides: 2,
  },

  cardCarouselProps: {
    color: 'blue',
  },
};

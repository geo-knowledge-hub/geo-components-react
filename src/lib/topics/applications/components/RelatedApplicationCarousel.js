/*
 * This file is part of geo-knowledge-hub.
 * Copyright (C) 2021-2022 GEO Secretariat.
 *
 * geo-knowledge-hub is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Card } from 'semantic-ui-react';
import { Slider, CarouselProvider } from 'pure-react-carousel';

import { CardSlide } from './CardSlide';
import { CardDotGroup } from './CardDotGroup';

import 'pure-react-carousel/dist/react-carousel.es.css';

/**
 * Related Application Carousel.
 */
export const RelatedApplicationCarousel = ({
  relatedApplications,
  carouselProps,
  cardGroupProps,
  cardCarouselProps,
}) => (
  <CarouselProvider {...carouselProps}>
    <Slider>
      {relatedApplications.map((relatedApplication, index) => (
        <CardSlide
          key={index}
          index={index}
          content={
            <>
              <Card.Content description={relatedApplication.title} />
              <Card.Content extra>
                <a
                  href={relatedApplication.url}
                  target={'_blank'}
                  rel="noopener noreferrer"
                >
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

RelatedApplicationCarousel.propTypes = {
  relatedApplications: PropTypes.array.isRequired,

  carouselProps: PropTypes.object,

  cardGroupProps: PropTypes.object,

  cardCarouselProps: PropTypes.object,
};

RelatedApplicationCarousel.defaultProps = {
  relatedApplications: [],

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

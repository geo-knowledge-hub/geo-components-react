/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';

import { Button, Card } from 'semantic-ui-react';

import { LazyImage } from './LazyImage';

import './CardCarousel.css';

export const CardCarousel = ({ elements, carouselSettings }) => {
  return (
    <div className="card-carousel">
      <div className="card-box">
        <Slider {...carouselSettings}>
          {elements.map((element, index) => (
            <div className="card-moldure">
              <Card key={index}>
                <LazyImage src={element.image} />

                <Card.Content extra textAlign="center">
                  <Button
                    icon="search"
                    as={'a'}
                    href={element.url}
                    size="mini"
                  />
                </Card.Content>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

CardCarousel.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  carouselSettings: PropTypes.object.isRequired,
};

CardCarousel.defaultProps = {
  carouselSettings: {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 450,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  },
};

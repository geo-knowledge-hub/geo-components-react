/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';

import { LazyImage } from './LazyImage';

import './ImageCarousel.css';

export const ImageCarousel = ({ images, carouselSettings }) => {
  return (
    <div className="image-carousel">
      <Slider {...carouselSettings}>
        {images.map((image, index) => {
          return (
            <a target="_blank" href={image.url}>
              <LazyImage key={index} src={image.image} />
            </a>
          );
        })}
      </Slider>
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  carouselSettings: PropTypes.object.isRequired,
};

ImageCarousel.defaultProps = {
  carouselSettings: {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
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

/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Card, Image, Image as ImageStyle } from 'semantic-ui-react';

import { ContentCarousel } from '../ContentCarousel';

/**
 * @name ImageCarousel
 * @summary A basic and customizable image carousel component.
 *
 * @param imageItems array Array with the image objects to be presented in the carousel.
 * @param carouselProviderProps object Object with options to the
 *        ``pure-react-carousel`` ``CarouselProvider`` provider.
 * @param cardGroupProps object Object with options to the ``semantic-ui-react``
 *        ``Button.Group`` component.
 * @param slideProps object Object with options to the ``pure-react-carousel``
 *        ``Slide`` component.
 * @param cardProps object Object with options to the ``semantic-ui-react``
 *        ``Card`` component used to represent the images.
 *
 * @see The images is this carousel is defined inside a Semantic UI Card. Also, we use
 *      the `'React Lazy load image component` (with Blur effect) to load the images
 *      in a lazy way.
 */
export const ImageCarousel = ({
  imageItems,
  includeHeader,
  headerPath,
  ...carouselProps
}) => {
  return (
    <ContentCarousel
      contentData={imageItems}
      contentGenerator={(content, index, componentTheme) => (
        <>
          <Image className={componentTheme.slides.slideImageClass}>
            <ImageStyle centered fluid rounded>
              <LazyLoadImage src={content.props.icon} effect={'blur'} />
            </ImageStyle>
          </Image>
          {includeHeader ? (
            <Card.Content>
              <Card.Header className={componentTheme.slides.headerClass}>
                {_get(content, headerPath)}
              </Card.Header>
            </Card.Content>
          ) : null}
        </>
      )}
      {...carouselProps}
    />
  );
};

ImageCarousel.propTypes = {
  imageItems: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        icon: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.shape({
        en: PropTypes.string,
      }),
    })
  ).isRequired,
  cardProps: PropTypes.object,
  slideProps: PropTypes.object,
  includeHeader: PropTypes.bool,
  headerPath: PropTypes.string,
};

ImageCarousel.defaultProps = {
  includeHeader: false,
};

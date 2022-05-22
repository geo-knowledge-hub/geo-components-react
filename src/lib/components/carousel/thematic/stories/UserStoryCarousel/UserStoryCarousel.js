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
import _truncate from 'lodash/truncate';

import { Card, Divider, Button } from 'semantic-ui-react';

import { ContentCarousel } from '../../../moldure';

/**
 * @name UserStoryCarousel
 * @summary A basic and customizable image carousel component.
 *
 * @param userStories array Array with the image objects to be presented in the carousel.
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
export const UserStoryCarousel = ({ userStories, ...carouselProps }) => {
  return (
    <ContentCarousel
      contentData={userStories}
      contentGenerator={(content, index, componentTheme) => (
        <>
          <Card.Content>
            <Card.Header
              style={{
                textAlign: 'center',
                maxHeight: '60px',
                fontSize: '14px',
                color: '#444447',
              }}
            >
              {_truncate(content.title, { length: 180 })}
            </Card.Header>
            <Divider />
            <Card.Description style={{ textAlign: 'justify' }}>
              {_truncate(content.ui.description_stripped, {
                length: 140,
              })}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a href={content.url}>
              <Button size={'tiny'}>Learn more</Button>
            </a>
          </Card.Content>
        </>
      )}
      {...carouselProps}
    />
  );
};

// ToDo
// ImageCarousel.propTypes = {
//   userStories: PropTypes.arrayOf(
//     PropTypes.shape({
//       props: PropTypes.shape({
//         icon: PropTypes.string.isRequired,
//       }).isRequired,
//       title: PropTypes.shape({
//         en: PropTypes.string,
//       }),
//     })
//   ).isRequired,
//   cardProps: PropTypes.object,
//   slideProps: PropTypes.object,
//   includeHeader: PropTypes.bool,
//   headerPath: PropTypes.string,
// };

// ImageCarousel.defaultProps = {
//   includeHeader: false,
// };

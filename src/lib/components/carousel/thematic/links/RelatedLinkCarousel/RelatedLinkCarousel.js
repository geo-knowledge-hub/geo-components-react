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

import { Card, Icon, Input } from 'semantic-ui-react';

import { ContentCarousel } from '../../../moldure';

/**
 * @name RelatedLinkCarousel
 * @summary A basic and customizable carousel component to present Record Related Links.
 *
 * @param relatedLinks array Array with the objects to be presented in the carousel.
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
export const RelatedLinkCarousel = ({ relatedLinks, ...carouselProps }) => {
  return (
    <ContentCarousel
      contentData={relatedLinks}
      contentGenerator={(content, index, componentTheme) => (
        <>
          <Card.Content>
            <Card.Header>
              {_truncate(_get(content, 'title', ''), { length: 180 })}
            </Card.Header>
            <Card.Meta>
              {/*<Icon name={'database'} />*/}
              {_truncate(_get(content, 'resource_type.title_l10n', ''), {
                length: 180,
              })}
            </Card.Meta>
            <Card.Content extra className={'mt-20'}>
              <p>
                {_truncate(_get(content, 'description', ''), { length: 180 })}
              </p>
            </Card.Content>
            <div className={'mt-10'}>
              <Input
                action={{
                  labelPosition: 'right',
                  icon: 'copy',
                  content: 'Copy',
                  onClick: () => {
                    navigator.clipboard.writeText(
                      _get(content, 'identifier', '')
                    );
                  },
                }}
                fluid
                readOnly={true}
                defaultValue={_get(content, 'identifier', '')}
              />
            </div>
          </Card.Content>
        </>
      )}
      {...carouselProps}
    />
  );
};

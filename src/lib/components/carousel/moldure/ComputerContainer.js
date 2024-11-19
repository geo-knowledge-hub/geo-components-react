/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _chunk from 'lodash/chunk';

import { Grid, Button, Transition, Card, Icon } from 'semantic-ui-react';

import { CardCarousel, LazyImage } from '../base';

import './ComputerContainer.css';

const ComputerContainerPaginated = ({ elements }) => {
  const [isSubVisible, setIsSubVisible] = useState(false);
  const [subCarouselData, setSubCarouselData] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState('left');

  const elementsChunked = _chunk(elements, 4);
  const elementsUI = elementsChunked.map((els) => (
    <Card.Group centered stackable itemsPerRow={4}>
      {els.map((element) => {
        return (
          <Card key={element.id}>
            <LazyImage src={element.image} />

            <Card.Content extra textAlign={'center'}>
              {element.hasSubElements ? (
                <Button
                  size={'small'}
                  icon={isSubVisible ? 'arrow up' : 'arrow down'}
                  onClick={() => {
                    setIsSubVisible(!isSubVisible);
                    setSubCarouselData(element.subElements);
                  }}
                />
              ) : (
                <Button
                  size={'small'}
                  icon={'search'}
                  as={'a'}
                  href={element.url}
                />
              )}
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  ));

  const currentElementUI = elementsUI[itemIndex];

  const updateItemIndex = (index) => {
    if (index >= 0 && index < elementsChunked.length) {
      setAnimationDirection(itemIndex < index ? 'right' : 'left');
      setItemIndex(index);
    }
  };

  return (
    <Grid.Row only={'computer'} className={'container-paginated'}>
      <Grid className={'carousel'}>
        <Grid.Column
          width="1"
          className="pr-0"
          verticalAlign="middle"
          textAlign="left"
        >
          <Icon
            className="carousel-arrow"
            inverted
            role="button"
            name="angle left"
            size="huge"
            aria-label={'Previous slide'}
            onClick={() => updateItemIndex(itemIndex - 1)}
            onKeyDown={(event) =>
              event.key === 'Enter' && updateItemIndex(itemIndex - 1)
            }
            tabIndex="0"
          />
        </Grid.Column>

        <Grid.Column width="13">
          <Transition.Group
            className="flex align-items-center justify-center"
            duration={1500}
            animation={`carousel-slide ${animationDirection}`}
            directional
          >
            {currentElementUI}
          </Transition.Group>
        </Grid.Column>

        <Grid.Column
          width="1"
          className="pl-0"
          verticalAlign="middle"
          textAlign="right"
        >
          <Icon
            className="carousel-arrow"
            inverted
            role="button"
            name="angle right"
            size="huge"
            aria-label={'Next slide'}
            onClick={() => updateItemIndex(itemIndex + 1)}
            onKeyDown={(event) =>
              event.key === 'Enter' && updateItemIndex(itemIndex + 1)
            }
            tabIndex="0"
          />
        </Grid.Column>
      </Grid>
    </Grid.Row>
  );
};

const ComputerContainerBasic = ({ elements }) => {
  const [isSubVisible, setIsSubVisible] = useState(false);
  const [subCarouselData, setSubCarouselData] = useState([]);

  return (
    <Grid.Row only={'computer'} className={'container-basic'}>
      <Card.Group centered stackable itemsPerRow={4}>
        {elements.map((element) => {
          return (
            <Card key={element.id}>
              <LazyImage src={element.image} />

              <Card.Content extra textAlign={'center'}>
                {element.hasSubElements ? (
                  <Button
                    size={'small'}
                    icon={isSubVisible ? 'arrow up' : 'arrow down'}
                    onClick={() => {
                      setIsSubVisible(!isSubVisible);
                      setSubCarouselData(element.subElements);
                    }}
                  />
                ) : (
                  <Button
                    size={'small'}
                    icon={'search'}
                    as={'a'}
                    href={element.url}
                  />
                )}
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
      <Transition
        visible={isSubVisible}
        animation={'slide down'}
        duration={500}
      >
        <div className={'collapsable'}>
          <CardCarousel elements={subCarouselData} />
        </div>
      </Transition>
    </Grid.Row>
  );
};

/**
 * Computer Container component.
 */
export const ComputerContainer = ({ elements }) => {
  let ContainerComponent = ComputerContainerBasic;

  if (elements.length > 4) {
    ContainerComponent = ComputerContainerPaginated;
  }

  return <ContainerComponent elements={elements} />;
};

ComputerContainer.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

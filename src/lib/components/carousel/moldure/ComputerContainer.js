/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Grid, Button, Transition, Card } from 'semantic-ui-react';

import { CardCarousel, LazyImage } from '../base';

import './ComputerContainer.css';

export const ComputerContainer = ({ elements }) => {
  const [isSubVisible, setIsSubVisible] = useState(false);
  const [subCarouselData, setSubCarouselData] = useState([]);

  return (
    <Grid.Row only={'computer'}>
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

ComputerContainer.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

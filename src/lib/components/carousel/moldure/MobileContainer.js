/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Grid, Button, Item, Transition } from 'semantic-ui-react';

import { LazyImage } from '../base';
import * as constants from './constants';

export const MobileContainer = ({ elements }) => {
  const [isSubVisible, setIsSubVisible] = useState(false);
  const [subCarouselData, setSubCarouselData] = useState({
    type: null,
    data: [],
  });

  return (
    <Grid.Row only={'mobile'}>
      <Grid.Column width={16} textAlign={'center'}>
        <Item.Group relaxed divided>
          {elements.map((element) => {
            return (
              <Item key={element.id}>
                <LazyImage src={element.image} size={'small'} />
                <Item.Content>
                  <Item.Header>{element.title}</Item.Header>
                </Item.Content>
                <Item.Extra>
                  {element.hasSubElements ? (
                    <Button
                      size={'small'}
                      icon={isSubVisible ? 'arrow up' : 'arrow down'}
                      onClick={() => {
                        setIsSubVisible(!isSubVisible);
                        setSubCarouselData({
                          type: element.id,
                          data: element.subElements,
                        });
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
                </Item.Extra>

                {element.hasSubElements ? (
                  <Transition
                    visible={
                      isSubVisible && subCarouselData.type === element.id
                    }
                    animation={constants.CAROUSEL_ANIMATION}
                    duration={constants.CAROUSEL_ANIMATION_DURATION}
                    onHide={() => {
                      setIsSubVisible(false);
                      setSubCarouselData({
                        type: null,
                        data: [],
                      });
                    }}
                  >
                    <Item.Group relaxed divided className={'list-moldure'}>
                      {subCarouselData.data.map((row, index) => (
                        <Item key={index}>
                          <LazyImage src={row.image} size={'tiny'} />

                          <Item.Content verticalAlign={'middle'}>
                            <Item.Header>{row.title}</Item.Header>
                          </Item.Content>
                          <Item.Extra>
                            <Button
                              size={'small'}
                              icon={'search'}
                              as={'a'}
                              href={row.url}
                            />
                          </Item.Extra>
                        </Item>
                      ))}
                    </Item.Group>
                  </Transition>
                ) : null}
              </Item>
            );
          })}
        </Item.Group>
      </Grid.Column>
    </Grid.Row>
  );
};

MobileContainer.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

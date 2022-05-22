/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

import { Dot as BaseDot } from 'pure-react-carousel';
import { Button, Container } from 'semantic-ui-react';

/**
 * Styled components
 */
const ButtonGroupContainer = styled(Container)`
  text-align: center;
`;

/**
 * @name ControlDotButtonGroup
 * @summary This is a group of ``Button`` component used to
 *          control the Carousel slides.
 *
 * @see The rendered button is pre-styled with the Semantic UI theme.
 */
export const ControlDotButtonGroup = ({
  numberOfSlides,
  buttonProps,
  buttonGroupProps,
}) => (
  <ButtonGroupContainer>
    <Button.Group {...buttonGroupProps}>
      {[...Array(numberOfSlides).keys()].map((slide) => (
        <Button
          as={BaseDot}
          key={slide}
          icon="circle"
          slide={slide}
          {...buttonProps}
        />
      ))}
    </Button.Group>
  </ButtonGroupContainer>
);

ControlDotButtonGroup.propTypes = {
  numberOfSlides: PropTypes.number.isRequired,
  buttonProps: PropTypes.object,
  buttonGroupProps: PropTypes.object,
};

ControlDotButtonGroup.defaultProps = {
  buttonGroupProps: {
    size: 'mini',
  },
};

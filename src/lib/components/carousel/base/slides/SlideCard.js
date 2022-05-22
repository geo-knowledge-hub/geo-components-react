/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@emotion/react';

import { Card as CardStyle } from 'semantic-ui-react';
import { Slide as BaseSlide } from 'pure-react-carousel';

/**
 * @name Slide
 * @summary Generic container to store the carousel content. One Slide,
 *          represents a only one instance of an element in the carousel.
 *
 *
 * @see The rendered Slide is pre-styled with the Semantic UI.
 */
export const SlideCard = ({ index, slideProps, cardProps, ...props }) => {
  const componentTheme = useTheme();

  return (
    <BaseSlide index={index} {...slideProps}>
      <CardStyle
        index={index}
        className={componentTheme.slides.slideElementClass}
        {...cardProps}
      />
    </BaseSlide>
  );
};

SlideCard.propTypes = {
  index: PropTypes.number.isRequired,
  slideProps: PropTypes.object,
  cardProps: PropTypes.object,
};

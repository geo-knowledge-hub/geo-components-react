/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { useTheme } from '@emotion/react';

import { Card } from 'semantic-ui-react';
import { CarouselProvider, Slider } from 'pure-react-carousel';
import { ControlDotButtonGroup, SlideCard } from '../../base';

export const ContentCarousel = ({
  contentData,
  contentGenerator,
  carouselProviderProps,
  cardGroupProps,
  slideProps,
  sliderProps,
  cardProps,
}) => {
  const componentTheme = useTheme();
  const numberOfElements = contentData.length;

  return (
    <CarouselProvider
      {...{
        naturalSlideWidth: 1,
        naturalSlideHeight: 1.25,
        totalSlides: numberOfElements,
        ...carouselProviderProps,
      }}
    >
      <Slider {...sliderProps}>
        <div className={componentTheme.slides.slideContainerClass}>
          <div className={componentTheme.slides.slideBodyClass}>
            {contentData.map((content, index) => (
              <SlideCard
                index={index}
                key={index}
                cardProps={{
                  content: contentGenerator(content, index, componentTheme),
                  ...cardProps,
                }}
                {...slideProps}
              />
            ))}
          </div>
        </div>
      </Slider>

      <ControlDotButtonGroup
        numberOfSlides={numberOfElements}
        {...cardGroupProps}
      />
    </CarouselProvider>
  );
};

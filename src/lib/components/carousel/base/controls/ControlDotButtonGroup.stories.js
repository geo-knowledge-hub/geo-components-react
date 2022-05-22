/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { CarouselProvider } from 'pure-react-carousel';

import { ControlDotButtonGroup } from './ControlDotButtonGroup';

export default {
  title: 'Carousel/Base/Carousel Control',
  component: ControlDotButtonGroup,
};

/**
 * Component template
 */
const Template = (args) => (
  <CarouselProvider>
    <ControlDotButtonGroup {...args} />
  </CarouselProvider>
);

/**
 * Component Stories
 */
export const BasicControl = Template.bind({});
BasicControl.args = {
  numberOfSlides: 5,
};

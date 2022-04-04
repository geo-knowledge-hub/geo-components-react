/*
 * This file is part of geo-knowledge-hub.
 * Copyright (C) 2021-2022 GEO Secretariat.
 *
 * geo-knowledge-hub is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';
import { Slide } from 'pure-react-carousel';

/**
 * @name CardSlide
 * @summary Semantic UI Card component customized to `pure-react-carousel`
 *
 * @note This component is based on `layershifter` example.
 *       (https://github.com/layershifter/semantic-ui-react-with-pure-react-carousel)
 */
export const CardSlide = ({ index, ...cardProps }) => (
  <Slide index={index}>
    <div style={{ padding: 10 }}>
      <Card fluid {...cardProps} />
    </div>
  </Slide>
);

CardSlide.propTypes = {
  index: PropTypes.number.isRequired,
  cardProps: PropTypes.object,
};

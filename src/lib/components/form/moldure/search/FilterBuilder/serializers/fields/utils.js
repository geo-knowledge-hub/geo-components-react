/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';

/**
 * Check if a value is empty (without values, undefined or null).
 *
 * @param {Object} value Object to be checked.
 * @returns {Boolean} boolean indicating if the value is empty or not.
 */
export const isEmpty = (value) => {
  return _isNil(value) || _isEmpty(value);
};

// This file is part of React-Invenio-Deposit
// Copyright (C) 2021 CERN.
// Copyright (C) 2021 Northwestern University.
//
// React-Invenio-Deposit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import _isNil from 'lodash/isNil';

/**
 * Check if a given funder is EU-related.
 */
export const isEUFunder = (funderId, validIds) => {
  return !_isNil(funderId) && validIds.indexOf(funderId) !== -1;
};

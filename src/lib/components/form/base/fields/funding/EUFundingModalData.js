// This file is part of React-Invenio-Deposit
// Copyright (C) 2021 CERN.
// Copyright (C) 2021 Northwestern University.
//
// React-Invenio-Deposit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import _isNil from 'lodash/isNil';

/**
 * EU Funding - Visibility document
 */
export const EUFundingVisibilityDocument =
  'https://commission.europa.eu/funding-tenders/managing-your-project/communicating-and-raising-eu-visibility_en';

/**
 * EU Funding logo versions.
 */
export const EUFundingLogos = [
  {
    id: 'eu-fundedby-2014-2020',
    text: 'Funded by the European Union',
    logo: '/static/images/funding/eu/eu-fundedby-2014-2020.png',
    programme: '2014 - 2020',
  },
  {
    id: 'eu-fundedby-2021-2027',
    text: 'Funded by the European Union',
    logo: '/static/images/funding/eu/eu-fundedby-2021-2027.png',
    programme: '2021 - 2027',
  },
  {
    id: 'eu-cofundedby-2021-2027',
    text: 'Co-funded by the European Union',
    logo: '/static/images/funding/eu/eu-cofundedby-2021-2027.png',
    programme: '2021-2027',
  },
  {
    id: 'eu-ng-fundedby-2021-2027',
    text: 'Funded by the European Union (NextGenerationEU)',
    logo: '/static/images/funding/eu/eu-ng-fundedby-2021-2027.png',
    programme: '2021 - 2027',
  },
];

/**
 * List of EU-related funders.
 */
export const EUFunderValidID = [
  '00k4n6c32', // European Commission
];

/**
 * Check if a given funder is EU-related.
 */
export const isEUFunder = (funderId) => {
  return !_isNil(funderId) && EUFunderValidID.indexOf(funderId) !== -1;
};

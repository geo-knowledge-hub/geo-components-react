/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { FundingAwardsTable } from './FundingAwardsTable';

import { render } from '../../../../../setupTestRenders';

import fundingAwardsTable from '../../../../../mocks/table/table-funding-awards.json';

const extraConfiguration = {
  'eu-funding-logos': [
    {
      id: 'eu-fundedby-2014-2020',
      text: 'Funded by the European Union',
      logo: 'eu-fundedby-2014-2020.png',
      programme: '2014 - 2020',
    },
    {
      id: 'eu-fundedby-2021-2027',
      text: 'Funded by the European Union',
      logo: 'eu-fundedby-2021-2027.png',
      programme: '2021 - 2027',
    },
    {
      id: 'eu-cofundedby-2021-2027',
      text: 'Co-funded by the European Union',
      logo: 'eu-cofundedby-2021-2027.png',
      programme: '2021-2027',
    },
    {
      id: 'eu-ng-fundedby-2021-2027',
      text: 'Funded by the European Union (NextGenerationEU)',
      logo: 'eu-ng-fundedby-2021-2027.png',
      programme: '2021 - 2027',
    },
  ],
};

describe('FundingAwardsTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(
        <FundingAwardsTable
          tableData={fundingAwardsTable}
          extraConfig={extraConfiguration}
        />
      );
    });
  });
});

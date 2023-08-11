/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import { Grid, Loader } from 'semantic-ui-react';

import { mutateVocabularyData } from '../base/mutations';
import {
  ComputerContainer,
  MobileContainer,
  TabletContainer,
} from '../moldure';
import { fetchVocabulary } from '../../../resources';

//
// Components
//

export const ConventionsCarousel = ({
  filterUrl,
  vocabularyType,
  staleTime,
}) => {
  // Hooks
  const { data: conventions, isFetching } = useQuery({
    queryKey: ['carousel-conventions'],
    queryFn: () => {
      return fetchVocabulary(vocabularyType, {
        q: 'props.is_subtype:"false" AND props.engagement_type:convention',
      }).then((data) =>
        data
          .filter((row) => !!row.props.icon)
          .map((row) => mutateVocabularyData(row, filterUrl))
      );
    },
    staleTime,
  });

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <Grid>
          <MobileContainer elements={conventions} />
          <TabletContainer elements={conventions} />
          <ComputerContainer elements={conventions} />
        </Grid>
      )}
    </>
  );
};

ConventionsCarousel.propTypes = {
  filterUrl: PropTypes.string.isRequired,
  vocabularyType: PropTypes.string.isRequired,
  staleTime: PropTypes.number,
};

ConventionsCarousel.defaultProps = {
  staleTime: 300000, // 5 minutes
  vocabularyType: 'engagementprioritiestypes',
};

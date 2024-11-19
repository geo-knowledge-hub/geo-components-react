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

import natsort from 'natsort';
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
export const FocusAreasCarousel = ({
  filterUrl,
  vocabularyType,
  staleTime,
}) => {
  // Utilities
  const natsorter = natsort({ insensitive: true });

  // Hooks
  const { data: conventions, isFetching } = useQuery({
    queryKey: ['carousel-focus-areas'],
    queryFn: () => {
      return fetchVocabulary(vocabularyType, {
        q: 'props.is_subtype:"false" AND props.theme:focus-areas',
      }).then((data) =>
        data
          .filter((x) => !(['', null].indexOf(x.props.icon) > -1))
          .sort((a, b) => natsorter(a.id, b.id))
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
        <Grid className={'carousel-container carousel-paginated'}>
          <MobileContainer elements={conventions} />
          <TabletContainer elements={conventions} />
          <ComputerContainer elements={conventions} />
        </Grid>
      )}
    </>
  );
};

FocusAreasCarousel.propTypes = {
  filterUrl: PropTypes.string.isRequired,
  vocabularyType: PropTypes.string.isRequired,
  staleTime: PropTypes.number,
};

FocusAreasCarousel.defaultProps = {
  staleTime: 300000, // 5 minutes
  vocabularyType: 'engagementprioritiestypes',
};

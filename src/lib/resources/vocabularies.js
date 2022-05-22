/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { http } from './api';

/**
 * Fetch vocabulary data from GEO Knowledge Hub API.
 *
 * @param {string} vocabularyType Name of the vocabulary to be retrieved.
 * @param {object} searchArgs Object with the search arguments.
 * @param {object} httpClient Axios object used to request the API.
 *
 * @returns {Promise} returns the request promise (generated with axios).
 */
export const fetchVocabulary = async (
  vocabularyType,
  searchArgs,
  httpClient = http
) => {
  const {
    data: {
      hits: { hits: vocabularyData },
    },
  } = await httpClient.get(`/api/vocabularies/${vocabularyType}`, searchArgs);

  return vocabularyData;
};

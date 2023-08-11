/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _get from 'lodash/get';

/**
 * Extract a GEO Work Programme Activity Name from a String
 *
 * @param {string} programmeActivityName String containing the Programme Name
 * @returns {string} Programme name
 */
export const extractProgrammeActivityAcronym = (programmeActivityName) =>
  programmeActivityName
    ? _get(programmeActivityName.match(/\(([^)]+)\)/), 1, null)
    : null;

/**
 * Mutate record to a simplified version.
 * @param {object} data Record data
 * @returns {{
 *  title: string,
 *  authors: string[],
 *  initiative: string,
 *  date: string
 * }} Object with the new version of the record.
 */
export const mutateRecordData = (data) => ({
  title: _get(data, 'metadata.title', 'No title'),
  authors: data.ui.creators.creators
    .slice(0, 3)
    .map((creator) => creator.person_or_org.name),
  initiative: extractProgrammeActivityAcronym(
    _get(data, 'metadata.geo_work_programme_activity.title.en')
  ),
  date: _get(
    data,
    'ui.publication_date_l10n_long',
    'No publication date found.'
  ),
  url: _get(data, 'links.self_html'),
});

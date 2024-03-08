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
 * @param {string} labelType Type of label (``initiative`` or ``resourceType``)
 * @param {string} labelColor Color used to present the table.
 * @returns {{
 *  title: string,
 *  authors: string[],
 *  label: string,
 *  labelColor: string,
 *  date: string
 * }} Object with the new version of the record.
 */
export const mutateRecordData = (data, labelType = "initiative", labelColor = "primary") => {
  // Extracting labels
  let label = extractProgrammeActivityAcronym(
    _get(data, 'metadata.geo_work_programme_activity.title.en')
  ) || "Community";

  if (labelType === "resourceType") {
    label = _get(
      data,
      "ui.resource_type.title_l10n",
      "No resource type"
    );
  }

  return ({
    title: _get(data, 'metadata.title', 'No title'),
    authors: data.ui.creators.creators
      .slice(0, 3)
      .map((creator) => creator.person_or_org.name),
    label: label,
    date: _get(
      data,
      'ui.publication_date_l10n_long',
      'No publication date found.'
    ),
    labelColor: labelColor || "primary",
    url: _get(data, 'links.self_html'),
  })
};

/**
 * Mutate event to a simplified version.
 * @param {object} data Event data
 * @returns {{
 *  title: string,
 *  category: string,
 *  date: string,
 *  location: string,
 *  url: string
 * }} Object with the new version of the event.
 */
export const mutateEventData = (data) => ({
  title: _get(data, 'attributes.title'),
  category: _get(data, 'attributes.category'),
  date: new Date(_get(data, 'attributes.date')).toUTCString(),
  location: _get(data, 'attributes.location'),
  url: _get(data, 'attributes.url'),
});

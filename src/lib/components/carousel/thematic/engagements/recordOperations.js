/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _groupBy from 'lodash/groupBy';

/**
 * Group vocabulary items. By default, the groups are created by the
 * supertype of the items (``props.type``).
 *
 * @param {array} vocabularyData Array of vocabulary item objects.
 * @param {string} iteratee Property used to group the data (dot pattern supported).
 *
 * @see Method The groupby implementation of this functions is provided by the ``lodash``. So, for more
 *             information, please, go to the lodash official documentation.
 */
export const groupVocabularyItemByType = (
  vocabularyData,
  iteratee = 'props.type'
) => {
  return _groupBy(vocabularyData, iteratee);
};

/**
 * Generate the search query for a given engagement priority id.
 *
 * @param {string} engagementPriorityId engagement priority id used in the search.
 *
 */
export const engagementPriorityQueryString = (engagementPriorityId) => {
  return `/search?q=metadata.engagement_priorities.id:${engagementPriorityId}`;
};

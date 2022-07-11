/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _map from 'lodash/map';
import _join from 'lodash/join';
import _isNil from 'lodash/isNil';
import _compact from 'lodash/compact';
import _groupBy from 'lodash/groupBy';
import _filter from 'lodash/filter';

import { QueryStringSerializer } from './QueryStringSerializer';

import {
  ValueField,
  VocabularyField,
  MultiVocabularyField,
  BoundingBoxField,
} from './fields';

/**
 * Static Query String serializer.
 *
 * @note `Static` in this case is used to define that the serialization `schema`
 *        used in this class don't change dynamically (runtime).
 */
export class StaticQueryStringSerializer extends QueryStringSerializer {

  /**
   * Serialization schema.
   * @type {{resourceTypes: ValueField, programmeActivities: ValueField, subjects: VocabularyField, engagementPriorities: ValueField, geometry: BoundingBoxField, targetAudiences: ValueField, authors: MultiVocabularyField}}
   */
  queryStringSchema = {
    authors: new MultiVocabularyField(
      'form.authors',
      [
        'metadata.creators.person_or_org.identifiers.identifier',
        'metadata.contributors.person_or_org.identifiers.identifier',
      ],
      'OR',
      'value'
    ),
    resourceTypes: new ValueField(
      'form.resourceTypes',
      'metadata.resource_type.id',
      'OR'
    ),
    targetAudiences: new ValueField(
      'form.targetAudiences',
      'metadata.target_audiences.id',
      'OR'
    ),
    engagementPriorities: new ValueField(
      'form.engagementPriorities',
      'metadata.engagement_priorities.id',
      'OR'
    ),
    programmeActivities: new ValueField(
      'form.programmeActivities',
      'metadata.geo_work_programme_activity.id',
      'OR'
    ),
    subjects: new VocabularyField(
      'form.subjects',
      'metadata.subjects.subject',
      'OR',
      'value'
    ),
    geometry: new BoundingBoxField('form.geometry', 'bbox'),
  };

  /**
   * Serialize multiple fields based on `queryStringSchema` definitions.
   * @param {Object} values Object with the field values to be serialized.
   * @returns {String} serialized values in the query string format.
   */
  serialize(values) {
    let serializedValues = Object.keys(values.form).map((key) =>
      this.queryStringSchema[key].serialize(values)
    );

    // Filtering empty values
    serializedValues = _filter(serializedValues, 'value');

    // Grouping the values by type
    const searchElements = _groupBy(serializedValues, 'type');

    // Processing the arguments for the `Query search arguments`
    let searchArgValues = searchElements.arg || [];
    searchArgValues = _map(searchArgValues, 'value').join(' AND ') || '';
    searchArgValues = !_isNil(searchElements) ? `q=${searchArgValues}` : '';

    // Processing the arguments for the `Parameters`
    let searchParamValues = searchElements.param || [];
    searchParamValues = _map(searchParamValues, 'value').join(' & ') || '';

    // Generating the final query string.
    return _join(_compact([searchArgValues, searchParamValues]), '&');
  }
}

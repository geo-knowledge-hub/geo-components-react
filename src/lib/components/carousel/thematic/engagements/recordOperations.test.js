/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  groupVocabularyItemByType,
  engagementPriorityQueryString,
} from './recordOperations';

import engagementPrioritiesTypes from '../../../../../mocks/vocabularies/engagementprioritiestypes.json';

describe('Engagement Carousel Record Operations utilities tests', () => {
  describe('GroupBy functions test', () => {
    describe('Vocabulary operations', () => {
      it('should return 1 group', () => {
        const vocabularyGroups = groupVocabularyItemByType(
          engagementPrioritiesTypes.hits.hits
        );

        expect(Object.keys(vocabularyGroups)).toHaveLength(1);
      });
    });
  });

  describe('Engagement Priority Query String operations', () => {
    it('should return a correct search URL for a given engagement priority id', () => {
      const engagementPriorityId = 'engagement-id';

      const queryString = engagementPriorityQueryString(engagementPriorityId);

      expect(queryString).toEqual(
        `/search?q=metadata.engagement_priorities.id:${engagementPriorityId}`
      );
    });
  });
});

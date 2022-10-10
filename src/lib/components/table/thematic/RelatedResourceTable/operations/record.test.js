/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  guessRecordGroupType,
  countRecordByType,
  facetedFilterRecordsFactory,
} from './record';

import resourceTypeData from '../../../../../../mocks/vocabularies/resourcetypes.json';
import relatedRecordsData from '../../../../../../mocks/table/table-related-resources.json';

describe('Table Record Operations utilities tests', () => {
  describe('Guess record type operation tests', () => {
    it('should return the correct type', () => {
      const guessedType = guessRecordGroupType('Dataset');

      expect(guessedType).toEqual('Dataset');
    });

    it('should return the default type', () => {
      const guessedType = guessRecordGroupType('Video/Audio');

      expect(guessedType).toEqual('Other');
    });

    it('should accept custom group types definition', () => {
      const guessedType = guessRecordGroupType('Video/Audio', {
        'Video/Audio': 'Digital Media',
      });

      expect(guessedType).toEqual('Digital Media');
    });
  });

  describe('Group record operation tests', () => {
    it('should create the correct record groups', () => {
      const recordGroups = countRecordByType(
        relatedRecordsData,
        resourceTypeData
      );

      // Dataset (11) | Publication (11) | Software (0) | Other (2)
      expect(recordGroups.map((x) => x.numberOfRecords)).toEqual(
        expect.arrayContaining([11, 11, 0, 2])
      );
    });
  });

  describe('Faceted search operation tests', () => {
    it('should filter by a specific type', () => {
      const filteredDataResults = [
        relatedRecordsData.filter(
          facetedFilterRecordsFactory({
            resourceType: 'Dataset',
            resourceTypesAvailable: resourceTypeData,
          })
        ).length,
        relatedRecordsData.filter(
          facetedFilterRecordsFactory({
            resourceType: 'Publication',
            resourceTypesAvailable: resourceTypeData,
          })
        ).length,
      ];

      // Dataset (11) | Publication (11)
      expect(filteredDataResults).toEqual(expect.arrayContaining([11, 11]));
    });
  });
});

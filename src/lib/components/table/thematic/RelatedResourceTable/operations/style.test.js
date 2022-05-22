/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { guessRecordGroupIcon } from './style';

describe('Style Operations utilities tests', () => {
  describe('Guess icon operation tests', () => {
    it('should guess a correct icon', () => {
      const guessedIcon = guessRecordGroupIcon('Dataset');

      expect(guessedIcon).toEqual('database');
    });

    it('should guess icon based on custom group definitions', () => {
      const guessedIcon = guessRecordGroupIcon('groupA', {
        groupA: 'iconA',
        groupB: 'iconB',
      });

      expect(guessedIcon).toEqual('iconA');
    });
  });
});

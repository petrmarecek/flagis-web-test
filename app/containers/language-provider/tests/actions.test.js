import {
  changeLocale,
} from '../actions';

import {
  CHANGE_LOCALE,
} from '../constants';

/* eslint-disable no-undef */

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        locale: 'de',
      };
      expect(changeLocale('de')).toEqual(expected);
    });
  });
});

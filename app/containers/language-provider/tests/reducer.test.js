import { fromJS } from 'immutable';

/* eslint-disable no-undefined */
/* eslint-disable no-undef */

import languageProviderReducer from '../reducer';
import {
  CHANGE_LOCALE,
} from '../constants';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual(fromJS({
      locale: 'en',
    }));
  });

  it('changes the locale', () => {
    expect(languageProviderReducer(undefined, { type: CHANGE_LOCALE, locale: 'de' }).toJS()).toEqual({
      locale: 'de',
    });
  });
});

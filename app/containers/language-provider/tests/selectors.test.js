import { fromJS } from 'immutable';

import {
  selectLanguage,
} from '../selectors';

/* eslint-disable no-undef */

describe('selectLanguage', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      language: globalState,
    });
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });
});

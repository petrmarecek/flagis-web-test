import { normalize } from 'normalizr';
import assign from 'lodash/assign';

export default function normalizrMiddleware() {
  return () => next => action => {
    const schema = action.meta && action.meta.schema

    if (schema && action.payload && !action.error) {
      const normalized = normalize(action.payload, schema)
      action = assign({}, action, { payload: normalized })
    }

    return next(action)
  }
}

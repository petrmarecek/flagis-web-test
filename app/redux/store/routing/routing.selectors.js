// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getRoutingPathname = state =>
  state.getIn(['route', 'location', 'pathname'])
export const getRoutingPrevPathname = state =>
  state.getIn(['route', 'location', 'prevPathname'])

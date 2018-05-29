// ------ Selectors -------------------------------------------------------------

// Export selectors
export const getRoutingPathname = state => state.getIn(['route', 'location', 'pathname'])

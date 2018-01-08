export const getRoutingPathname = state => {
  return state.getIn(['route', 'location', 'pathname'])
}

export const getRoutingPathname = state => {
  return state.getIn(['routing', 'locationBeforeTransitions', 'pathname'])
}

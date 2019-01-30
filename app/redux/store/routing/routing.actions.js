export const ROUTING = {
  CHANGE_LOCATION: 'ROUTING/CHANGE_LOCATION',
  CHANGE_NAVIGATION: 'ROUTING/CHANGE_NAVIGATION',
  CHANGE_NAVIGATION_SECONDARY: 'ROUTING/CHANGE_NAVIGATION_SECONDARY',
}

export const changeLocation = pathname => ({
  type: ROUTING.CHANGE_LOCATION,
  payload: {
    pathname,
  },
})

export const changeNavigation = (pathname, type = null) => ({
  type: ROUTING.CHANGE_NAVIGATION,
  payload: {
    pathname,
    type,
  },
})

export const changeNavigationSecondary = (pathname, type = null) => ({
  type: ROUTING.CHANGE_NAVIGATION_SECONDARY,
  payload: {
    pathname,
    type,
  },
})

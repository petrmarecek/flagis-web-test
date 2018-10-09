export default {
  RESTART_ON_REMOUNT: '@@saga-injector/restart-on-remount',
  DAEMON: '@@saga-injector/daemon',
  ONCE_TILL_UNMOUNT: '@@saga-injector/once-till-unmount',
  MIN_TOKEN_LIFESPAN: 300 * 1000,

  // Notification
  NOTIFICATION_ERROR_DURATION: 8000,
  NOTIFICATION_SUCCESS_DURATION: 6000,
  NOTIFICATION_INFO_DURATION: 4000,

  // Autocomplete and Hints
  HINT_HEIGHT: 26,
  AUTOCOMPLETE_INPUT_HEIGHT: 32,
  TITLE_HEIGHT: 30,
  WINDOW_HEIGHT: window.innerHeight,
  OFFSET: 100,
  MIN_HINTS_HEIGHT: 200,

  // Follower icons
  FOLLOWER_ICON_WIDTH: 22,
  FOLLOWER_ICON_HEIGHT: 28,
  NEW_FOLLOWER_ICON_WIDTH: 20,
  NEW_FOLLOWER_ICON__HEIGHT: 23,
}

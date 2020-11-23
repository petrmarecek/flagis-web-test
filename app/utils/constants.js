export default {
  RESTART_ON_REMOUNT: '@@saga-injector/restart-on-remount',
  DAEMON: '@@saga-injector/daemon',
  ONCE_TILL_UNMOUNT: '@@saga-injector/once-till-unmount',
  MIN_TOKEN_LIFESPAN: 30 * 1000,

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

  // Icons
  ASSIGNEE_ACCEPTED_WIDTH: 31,
  ASSIGNEE_ACCEPTED_HEIGHT: 22,
  FOLLOWER_ICON_WIDTH: 22,
  FOLLOWER_ICON_HEIGHT: 28,
  NEW_FOLLOWER_ICON_WIDTH: 20,
  NEW_FOLLOWER_ICON__HEIGHT: 23,

  // Tag-Tree
  TAG_TREE_ITEM_HEIGHT: 27,
  TAG_TREE_SECTION_HEIGHT: 32,

  // Tasks-menu
  TASKS_MENU_ICON_OFFSET: 50,

  // Tasks
  TASKS_TITLE_MAX_CHARACTERS: 255,

  // Tags
  TAGS_TITLE_MAX_CHARACTERS: 25,

  // Contacts
  CONTACTS_TITLE_MAX_CHARACTERS: 60,

  // Lists
  list: {
    tasks: {
      SCROLL_SPACE_HEIGHT: 75,
      SCROLL_STEP: 5,
    },
    tagTrees: {
      SCROLL_SPACE_HEIGHT: 50,
      SCROLL_STEP: 5,
    },
  },

  // Color themes
  DEFAULT_COLOR_THEME: 'standard',
}

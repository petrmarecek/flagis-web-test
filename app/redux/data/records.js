import { Record, Map, OrderedSet, List, Set } from 'immutable'

// ------ Common --------------------------------------------------------------

export const ListRecord = Record({
  isFetching: false,
  items: List()
})

export const TreeRecord = Record({
  id: null,
  childVisible: true
})

// ------ Partials ------------------------------------------------------------

const LeftPanel = Record({
  width: 290,
})

const CenterPanel = Record({
  isResizing: false,
})

export const Profile = Record({
  id: null,
  email: null,
  firstName: null,
  lastName: null,
})

export const Position = Record({
  top: 0,
  left: 0,
})

export const HintsContext = Record({
  source: null,
  parentId: null,
  updatedTreeItem: null
})

export const Error = Record({
  error: false,
  message: null,
})

export const Visibility = Record({
  isVisible: false,
})

export const TaskTagDetail = Record({
  task: false,
  archive: false,
  tag: false,
})

export const TagHints = Record({
  autocompleteId: null,

  isVisible: false,
  isSelectOnly: false,
  search: '',
  position: new Position(),
  context: new HintsContext(),

  visibleTags: List(),
  newItemVisible: false,
  newItemSelected: false,
  selectionIndex: 0,
  selectedItem: null
})

export const TagAutocomplete = Record({
  focus: null,
  text: '',
})

export const TagAutocompleteMap = Record({
  task: new TagAutocomplete(),
  tree: new TagAutocomplete(),
  treeUpdate: new TagAutocomplete(),
  search: new TagAutocomplete(),
})

export const MultiSelectTasks = Record({
  activeTags: List(),
  otherTags: List(),
  inactiveTags: List(),
  addTags: List(),
  removeTags: List(),
})

export const TasksFilters = Record({
  menu: new Visibility(),
  active: List(),
  range: null,
  important: false,
  unimportant: false,
  noTags: false,
  searchText: '',
})

export const TasksSort = Record({
  menu: new Visibility(),
  defaultSort: true,
  dueDate: false,
  alphabet: false,
  important: false,
  incomplete: false,
})

export const TasksOptions = Record({
  menu: new Visibility(),
})

// ------ Stores --------------------------------------------------------------

export const AuthStore = Record({
  isLogged: false,
  accessToken: null,
  expiresIn: null,
  refreshToken: null,
  newRefreshToken: false,
  firebaseToken: null,
  profile: null,
}, 'auth')

export const TasksMenuStore = Record({
  filters: new TasksFilters(),
  sort: new TasksSort(),
  options: new TasksOptions(),
})

export const AppStateStore = Record({
  loader: new Visibility(),
  leftPanel: new LeftPanel(),
  centerPanel: new CenterPanel(),
  multiSelect: new Visibility(),
  archivedTasks: new Visibility(),
  taskTagDetail: new TaskTagDetail(),
  undoBox: null,
  currentDialog: null,
  tagAutocompletes: new TagAutocompleteMap(),
  tagHints: new TagHints(),
  changePassword: new Error(),
  signIn: new Error(),
  signUp: new Error(),
})

export const TaskStore = Record({
  isFetching: false,
  items: List(),
  completed: List(),
  archived: new ListRecord(),
  selection: OrderedSet(),
})

export const TagStore = Record({
  search: '',
  byId: Map(),
  all: new ListRecord(),
  current: null,
  activeTags: List(),
  relations: Map(),
})

export const EntitiesStore = Record({
  tasks: Map(),
  tags: Map(),
  treeItems: Map(),
  comments: Map(),
  attachments: Map(),
})

export const TreeStore = Record({
  isFetching: false,
  addControlParentId: null,
  selection: List(),
  itemsById: Map(),
  itemsByParent: Map(),
  collapsedItems: Set(),
})

export const CommentStore = Record({
  isFetching: false,
})

export const AttachmentStore = Record({
  isFetching: false,
})

export const MultiSelectStore = Record({
  tasks: new MultiSelectTasks(),
})

// ------ Entities ------------------------------------------------------------

export const Task = Record({
  id: null,
  createdAt: null,
  subject: null,
  description: null,
  startDate: null,
  dueDate: null,
  reminderDate: null,
  order: null,
  orderTimeLine: null,
  isImportant: false,
  isCompleted: null,
  completedAt: null,
  isArchived: null,
  archivedAt: null,
  isTrashed: null,
  trashedAt: null,
  tags: List(),
})

export const Tag = Record({
  id: null,
  isNew: false,
  createdAt: null,
  updatedAt: null,
  title: null,
  colorIndex: null,
  description: null,
  createdById: null,
  isDeleted: null,
})

export const TagInfo = Record({
  id: null,
  isNew: false,
  title: null,
  colorIndex: null,
})

export const Tree = Record({
  parentId: null,
  items: List()
})

export const TreeItem = Record({
  id: null,
  title: null,
  order: null,
  createdAt: null,
  updatedAt: null,
  isSection: false,
  tagColorIndex: null,
  parentId: null,
  tagId: null,
  createdById: null,
  childItems: List(),
  collapsed: false,
  tag: null
})

export const Comment = Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  content: null,
  author: null,
  taskId: null,
  createdById: null,
  isDeleted: null,
})

export const Attachment = Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  taskId: null,
  createdById: null,
  url: null,
  fileName: null,
  //size: null,
  mimeType: null,
  client: null,
  isWritable: false,
  isDeleted: null,
})

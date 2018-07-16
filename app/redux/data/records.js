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

export const Position = Record({
  top: 0,
  left: 0,
})

export const Profile = Record({
  id: null,
  email: null,
  firstName: null,
  lastName: null,
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

export const Detail = Record({
  task: false,
  archive: false,
  tag: false,
  contact: false,
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
  alphabet: false,
  important: false,
  incomplete: false,
})

export const TasksOptions = Record({
  menu: new Visibility(),
})

// ------ Stores --------------------------------------------------------------

export const AppStateStore = Record({
  loader: new Visibility(),
  leftPanel: new LeftPanel(),
  multiSelect: new Visibility(),
  archivedTasks: new Visibility(),
  detail: new Detail(),
  undoBox: null,
  currentDialog: null,
  tagAutocompletes: new TagAutocompleteMap(),
  tagHints: new TagHints(),
  changeName: new Error(),
  changePassword: new Error(),
  signIn: new Error(),
  signUp: new Error(),
})

export const AuthStore = Record({
  isLogged: false,
  accessToken: null,
  expiresIn: null,
  refreshToken: null,
  newRefreshToken: false,
  firebaseToken: null,
  profile: null,
}, 'auth')

export const EntitiesStore = Record({
  tasks: Map(),
  tags: Map(),
  treeItems: Map(),
  comments: Map(),
  attachments: Map(),
  contacts: Map(),
})

export const TaskStore = Record({
  isFetching: false,
  items: List(),
  completed: List(),
  archived: new ListRecord(),
  timeLine: false,
  selection: OrderedSet(),
})

export const CommentStore = Record({
  isFetching: false,
})

export const AttachmentStore = Record({
  isFetching: false,
})

export const TasksMenuStore = Record({
  filters: new TasksFilters(),
  sort: new TasksSort(),
  options: new TasksOptions(),
})

export const MultiSelectStore = Record({
  tasks: new MultiSelectTasks(),
})

export const TagStore = Record({
  search: '',
  byId: Map(),
  all: new ListRecord(),
  current: null,
  activeTags: List(),
  relations: Map(),
})

export const TreeStore = Record({
  isFetching: false,
  addControlParentId: null,
  selection: List(),
  itemsById: Map(),
  itemsByParent: Map(),
  collapsedItems: Set(),
})

export const ContactStore = Record({
  isFetching: false,
  search: '',
  current: null,
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

export const Contacts = Record({
  id: null,
  email: null,
  nickname: '',
  description: null,
  createdAt: null,
  updatedAt: null,
  isUser: false,
})

import { Record, Map, OrderedSet, List, Set } from 'immutable'

// ------ Common --------------------------------------------------------------

export const ListRecord = Record({
  isFetching: false,
  items: List(),
})

export const ListAlreadyRecord = Record({
  isFetching: false,
  isAlreadyFetching: false,
  items: List(),
})

export const TreeRecord = Record({
  id: null,
  childVisible: true,
})

// ------ Partials ------------------------------------------------------------

export const Window = Record({
  width: null,
  height: null,
})

const LeftPanel = Record({
  width: 290,
})

export const Position = Record({
  top: 0,
  left: 0,
})

export const Settings = Record({
  colorTheme: null,
})

export const Profile = Record({
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  photo: null,
  verifiedAt: null,
  settings: new Settings(),
})

export const HintsContext = Record({
  source: null,
  parentId: null,
  updatedTreeItem: null,
})

export const Error = Record({
  error: false,
  message: null,
})

export const Visibility = Record({
  isVisible: false,
})

export const Loader = Record({
  attachments: false,
  form: false,
  global: false,
  profilePicture: false,
})

export const Lists = Record({
  task: null,
  tag: null,
  archived: null,
  contact: null,
  notification: null,
})

export const Detail = Record({
  task: false,
  archive: false,
  tag: false,
  contact: false,
  animation: false,
})

export const PrimaryHiddenNavigation = Record({
  isVisible: false,
  isAnimation: false,
})

export const PrimaryNavigation = Record({
  hiddenNavigation: new PrimaryHiddenNavigation(),
})

export const Navigation = Record({
  primary: new PrimaryNavigation(),
  account: new Visibility(),
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
  activeSender: null,
  activeAssignee: null,
  sender: false,
  assignee: false,
  range: null,
  important: false,
  unimportant: false,
  noTags: false,
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
  window: new Window(),
  loader: new Loader(),
  leftPanel: new LeftPanel(),
  multiSelect: new Visibility(),
  archivedTasks: new Visibility(),
  detail: new Detail(),
  scrollbarPosition: new Lists(),
  navigation: new Navigation(),
  undoBox: null,
  currentDialog: null,
  changeName: new Error(),
  changePassword: new Error(),
  contactUs: new Error(),
  signIn: new Error(),
  signUp: new Error(),
})

export const AuthStore = Record(
  {
    isLogged: false,
    isVerificationFailed: false,
    accessToken: null,
    expiresIn: null,
    expiresAt: null,
    refreshToken: null,
    firebaseToken: null,
    firebaseRefreshToken: null,
    profile: new Profile(),
  },
  'auth'
)

export const EntitiesStore = Record({
  tasks: Map(),
  tags: Map(),
  treeItems: Map(),
  activities: Map(),
  notifications: Map(),
  comments: Map(),
  attachments: Map(),
  followers: Map(),
  contacts: Map(),
})

export const TaskStore = Record({
  isFetching: false,
  isDragAndDropActive: false,
  items: List(),
  completed: List(),
  archived: new ListAlreadyRecord(),
  inbox: new ListRecord(),
  selection: OrderedSet(),
  search: '',
  draggingTask: null,
})

export const ActivitiesStore = Record({
  isFetching: false,
})

export const NotificationStore = Record({
  isFetching: false,
  isReadVisible: true,
})

export const CommentStore = Record({
  isFetching: false,
})

export const AttachmentStore = Record({
  isFetching: false,
})

export const StatsStore = Record({
  isFetching: true,
  data: null,
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
  isImportant: false,
  isCompleted: null,
  completedAt: null,
  isArchived: null,
  archivedAt: null,
  isTrashed: null,
  trashedAt: null,
  createdById: null,
  createdBy: null,
  isInbox: false,
  followers: List(),
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

export const Activities = Record({
  id: null,
  type: null,
  data: null,
  author: null,
  createdAt: null,
  updatedAt: null,
  taskId: null,
  createdById: null,
})

export const Notification = Record({
  id: null,
  type: null,
  data: null,
  sentAt: null,
  readAt: null,
  createdAt: null,
  updatedAt: null,
  taskId: null,
  userId: null,
  fromUserId: null,
  fromUserEmail: null,
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
  items: List(),
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
  tag: null,
})

export const Follower = Record({
  id: null,
  type: null,
  status: null,
  createdAt: null,
  updatedAt: null,
  archivedAt: null,
  isArchived: false,
  isImportant: false,
  order: null,
  userId: null,
  profile: null,
})

export const Contact = Record({
  id: null,
  email: null,
  nickname: null,
  description: null,
  createdAt: null,
  updatedAt: null,
  isUser: false,
  isContact: false,
  isEmailNotificationEnabled: true,
  isInvited: false,
  photo: null,
  me: false,
})

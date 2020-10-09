import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import debounce from 'lodash/debounce'
import { titles } from 'components/head-title/head-title-common'

// redux
import { controlRedirectSignIn } from 'redux/store/auth/auth.actions'
import { updateWindow } from 'redux/store/app-state/app-state.actions'
import {
  getAppStateItem,
  getLoader,
} from 'redux/store/app-state/app-state.selectors'

// components
import { withTitle } from 'components/head-title/withTitle'

// containers
import ToastNotificationsContainer from 'components/toast-notifications'
import Loader from 'components/common/loader'
import TaskPage from 'containers/task-page'
import TagPage from 'containers/tag-page'
import ArchivePage from '../archive-page/'
import ContactPage from '../contact-page/'
import NotificationPage from '../notification-page/'
import DashboardPage from 'containers/dashboard-page'
import AccountContainer from 'containers/account-container'
import NotFoundPage from 'containers/not-found-page/loadable'
import Dialogs from 'components/dialogs/dialogs'
import UndoBox from 'components/common/undo-box'

// adding title
const TaskPageWithTitle = withTitle(TaskPage, titles.TASKS)
const TagPageWithTitle = withTitle(TagPage, titles.TAGS)
const ArchivePageWithTitle = withTitle(ArchivePage, titles.ARCHIVE)
const ContactPageWithTitle = withTitle(ContactPage, titles.CONTACTS)
const NotificationPageWithTitle = withTitle(
  NotificationPage,
  titles.NOTIFICATIONS
)
const DashboardPageWithTitle = withTitle(DashboardPage, titles.DASHBOARD)
const NotFoundPageWithTitle = withTitle(NotFoundPage, titles.NOT_FOUND)

class UserContainer extends PureComponent {
  static propTypes = {
    controlRedirectSignIn: PropTypes.func,
    updateWindow: PropTypes.func,
    match: PropTypes.any,
    undoBox: PropTypes.object,
    loader: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.debouncedUpdateWindow = debounce(this.updateWindow, 250)
  }

  componentDidMount() {
    this.props.updateWindow(window)
    window.addEventListener('resize', this.debouncedUpdateWindow)
  }

  componentWillMount() {
    window.removeEventListener('resize', this.debouncedUpdateWindow)
    this.props.controlRedirectSignIn()
  }

  updateWindow = () => {
    this.props.updateWindow(window)
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div id="user-container">
          <div className="page-overflow-fix">
            <Switch>
              <Route
                path={`${this.props.match.path}/tasks`}
                component={TaskPageWithTitle}
              />
              <Route
                path={`${this.props.match.path}/tags`}
                component={TagPageWithTitle}
              />
              <Route
                path={`${this.props.match.path}/charts`}
                component={DashboardPageWithTitle}
              />
              <Route
                path={`${this.props.match.path}/archive`}
                component={ArchivePageWithTitle}
              />
              <Route
                path={`${this.props.match.path}/contacts`}
                component={ContactPageWithTitle}
              />
              <Route
                path={`${this.props.match.path}/notifications`}
                component={NotificationPageWithTitle}
              />
              <Route
                path={`${this.props.match.path}/account`}
                component={AccountContainer}
              />
              <Route component={NotFoundPageWithTitle} />
            </Switch>
          </div>
          <div className="dialog-container">
            <Dialogs />
          </div>
          <div className="floating-components">
            <div id="floating-components-hints" />
            <ToastNotificationsContainer />
            <UndoBox />
            {this.props.loader && <Loader global />}
          </div>
        </div>
      </DndProvider>
    )
  }
}

const mapStateToProps = state => ({
  undoBox: getAppStateItem(state, 'undoBox'),
  loader: getLoader(state).global,
})

const mapDispatchToProps = {
  updateWindow,
  controlRedirectSignIn,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)

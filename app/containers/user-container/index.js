import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ToastContainer, style } from 'react-toastify'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import debounce from 'lodash/debounce'

import { controlRedirectSignIn } from 'redux/store/auth/auth.actions'
import { updateWindow } from 'redux/store/app-state/app-state.actions'
import { getAppStateItem } from 'redux/store/app-state/app-state.selectors'

import Dialogs from 'components/dialogs/dialogs'
import UndoBox from 'components/common/undo-box'
import NavigationBar from 'components/navigation/navigation-bar'
import TaskPage from 'containers/task-page'
import TagPage from 'containers/tag-page'
import InboxPage from 'containers/inbox-page'
import DashboardPage from 'containers/dashboard-page'
import AccountContainer from 'containers/account-container'

class UserContainer extends PureComponent {
  static propTypes = {
    controlRedirectSignIn: PropTypes.func,
    updateWindow: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.any,
    undoBox: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.debouncedUpdateWindow = debounce(this.updateWindow, 250)
  }

  componentDidMount() {
    this.props.updateWindow(window)
    window.addEventListener('resize', this.debouncedUpdateWindow)

    style({
      BOTTOM_RIGHT: {
        bottom: '30px',
        right: '25px'
      }
    })
  }

  componentWillMount() {
    window.removeEventListener('resize', this.debouncedUpdateWindow)
    this.props.controlRedirectSignIn()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.undoBox !== null) {
      style({
        BOTTOM_RIGHT: {
          bottom: '90px',
          right: '25px'
        }
      })
    } else {
      style({
        BOTTOM_RIGHT: {
          bottom: '30px',
          right: '25px'
        }
      })
    }
  }

  updateWindow = () => {
    this.props.updateWindow(window)
  }

  render() {
    return (
      <div id="user-container">
        <NavigationBar location={this.props.location} />
        <div className='page-overflow-fix'>
          <Switch>
            <Route path={`${this.props.match.path}/tasks`} component={TaskPage} />
            <Route path={`${this.props.match.path}/tags`} component={TagPage} />
            <Route path={`${this.props.match.path}/inbox`} component={InboxPage} />
            <Route path={`${this.props.match.path}/dashboard`} component={DashboardPage} />
            <Route path={`${this.props.match.path}/account`} component={AccountContainer} />
          </Switch>
        </div>
        <div className="dialog-container">
          <Dialogs />
        </div>
        <div className="floating-components">
          <div id="floating-components-hints" />
          <ToastContainer />
          <UndoBox />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  undoBox: getAppStateItem(state, 'undoBox'),
})
const mapDispatchToProps = {
  updateWindow,
  controlRedirectSignIn
}

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(UserContainer)
)

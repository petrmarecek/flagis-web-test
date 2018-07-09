import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ToastContainer, style } from 'react-toastify'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import { controlRedirectSignIn } from 'redux/store/auth/auth.actions'
import { getAppStateItem } from 'redux/store/app-state/app-state.selectors'

import Dialogs from 'components/dialogs/dialogs'
import UndoBox from 'components/common/undo-box'
import NavigationBar from 'components/navigation/navigation-bar'
import FloatingComponents from 'components/floating/floating-components'
import TaskPage from 'containers/task-page'
import TagPage from 'containers/tag-page'
import ArchivePage from 'containers/archive-page'
import ContactPage from 'containers/contact-page'
import AccountPage from 'containers/account-page'

class UserContainer extends PureComponent {
  static propTypes = {
    controlRedirectSignIn: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.any,
    undoBox: PropTypes.object,
  }

  componentWillMount() {
    this.props.controlRedirectSignIn()
  }

  componentDidMount() {
    style({
      BOTTOM_RIGHT: {
        bottom: '30px',
        right: '25px'
      }
    })
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

  render() {
    return (
      <div id="user-container">
        <NavigationBar location={this.props.location} />
        <div className='page-overflow-fix'>
          <Switch>
            <Route path={`${this.props.match.path}/tasks`} component={TaskPage} />
            <Route path={`${this.props.match.path}/tags`} component={TagPage} />
            <Route path={`${this.props.match.path}/archive`} component={ArchivePage} />
            <Route path={`${this.props.match.path}/contacts`} component={ContactPage} />
            <Route path={`${this.props.match.path}/account`} component={AccountPage} />
          </Switch>
        </div>
        <div className="dialog-container">
          <Dialogs />
        </div>
        <div className="floating-components">
          <FloatingComponents />
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
const mapDispatchToProps = { controlRedirectSignIn }

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(UserContainer)
)

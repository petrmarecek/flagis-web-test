import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'
import { NotificationContainer } from 'react-notifications'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import { controlRedirectSignIn } from 'redux/store/auth/auth.actions'

import Dialogs from 'components/dialogs/dialogs'
import NavigationBar from 'components/navigation/navigation-bar'
import FloatingComponents from 'components/floating/floating-components'
import TaskPage from 'containers/task-page'
//import TagPage from 'containers/tag-page'
// import ArchivePage from 'containersarchive-page'
// import AccountPage from 'containersaccount-page'

class UserContainer extends Component {
  static propTypes = {
    controlRedirectSignIn: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.props.controlRedirectSignIn()
  }

  render() {
    const isAccountPage = this.props.location.pathname === '/user/account'
    const backgroundCss = cx({
      'page-overflow-fix': !isAccountPage,
      'page-overflow-fix page-overflow-fix--transparent': isAccountPage,
    })

    return (
      <div id="user-container">
        <NavigationBar location={this.props.location} />
        <div className={backgroundCss}>
          <Switch>
            <Route path={`${this.props.match.path}/tasks`} component={TaskPage} />
            {/*<Route path={`${this.props.match.path}/tags`} component={TagPage} />
            <Route path={`${this.props.match.path}/archive`} component={ArchivePage} />
            <Route path={`${this.props.match.path}/account`} component={AccountPage} />*/}
          </Switch>
        </div>
        <div className="dialog-container">
          <Dialogs />
        </div>
        <div className="floating-components">
          <FloatingComponents />
          <NotificationContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { controlRedirectSignIn }

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(UserContainer)
)

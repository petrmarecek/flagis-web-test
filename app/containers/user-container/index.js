import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'
import { NotificationContainer } from 'react-notifications'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import { controlRedirectSignIn } from 'redux/store/auth/auth.actions'

//import Dialogs from 'components/dialogs/dialogs'
import NavigationBar from 'components/navigation/navigation-bar'
//import FloatingComponents from 'components/floating/floating-components'

class UserContainer extends Component {
  static propTypes = {
    controlRedirectSignIn: PropTypes.func,
    children: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
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
      <div>
        <NavigationBar location={this.props.location} />
        <div className={backgroundCss}>
          {this.props.children}
        </div>
        <div className="dialog-container">
          {/*<Dialogs />*/}
        </div>
        <div className="floating-components">
          {/*<FloatingComponents />*/}
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

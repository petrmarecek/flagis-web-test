import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { defaultDisplay } from 'redux/store/app-state/app-state.actions'

import NavigationRight from 'components/navigation/navigation-right'
import MainSearch from 'components/elements/main-search'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

class NavigationBar extends Component {

  static propTypes = {
    defaultDisplay: PropTypes.func,
    location: PropTypes.object.isRequired,
  }

  handleClick = () => {
    this.props.defaultDisplay()
  }

  mainSearch = () => {
    const isAccountPage = this.props.location.pathname === '/user/account'
    const isTagPage = this.props.location.pathname === '/user/tags'
    if (!isAccountPage && !isTagPage) {
      return (
        <MainSearch />
      )
    } else {
      return null
    }
  }

  render() {
    const mainSearch = this.mainSearch()

    return (
      <nav className="navbar navbar--full">
        <div
          className="navbar__left"
          title="Default display">
          <Icon
            className="navbar__logo"
            icon={ICONS.LOGO}
            width={65}
            height={32}
            onClick={this.handleClick}/>
        </div>
        <div className="navbar__center">
          {mainSearch}
        </div>
        <div className="navbar__right">
          <NavigationRight location={this.props.location} />
        </div>
      </nav>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { defaultDisplay }

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)

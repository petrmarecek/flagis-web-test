import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import NavigationRight from 'components/navigation/navigation-right'
import MainSearch from 'components/common/main-search'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

import { defaultDisplay } from 'redux/store/app-state/app-state.actions'

import {
  Navbar,
  NavbarLeft,
  NavbarLogo,
  NavbarCenter,
  NavbarRight,
} from './styles'

const NavigationBar = ({ location, onHandleClick, mainSearch }) => {
  const search = mainSearch()

  return (
    <Navbar id='navbar'>
      <NavbarLeft title="Default display">
        <NavbarLogo>
          <Icon
            className="navbar__logo"
            icon={ICONS.LOGO}
            width={65}
            height={32}
            color={['#fff', '#00FFC7']}
            onClick={onHandleClick} />
        </NavbarLogo>
      </NavbarLeft>
      <NavbarCenter>
        {search}
      </NavbarCenter>
      <NavbarRight>
        <NavigationRight location={location} />
      </NavbarRight>
    </Navbar>
  )

}

NavigationBar.propTypes = {
  location: PropTypes.object.isRequired,
  onHandleClick: PropTypes.func,
  mainSearch: PropTypes.func,
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { defaultDisplay }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleClick: props => () => props.defaultDisplay(),
    mainSearch: props => () => {
      const { pathname } = props.location
      const tagsTemplate = '/user/tags'
      const numberTagsTemplate = tagsTemplate.length
      const isAccountPage = pathname === '/user/account'
      const isTagPage = pathname.substring(0, numberTagsTemplate) === tagsTemplate

      if (isAccountPage || isTagPage) {
        return null
      } else {
        return <MainSearch/>
      }
    }
  })
)(NavigationBar)

import React from 'react'
import PropTypes from 'prop-types'
import { ICONS } from '../icons/icon-constants'

import {connect} from 'react-redux'
import {compose, withHandlers} from 'recompose'

import { logout } from 'redux/store/auth/auth.actions'
import { hideArchivedTasks, changeLocation } from 'redux/store/app-state/app-state.actions'
import {
  fetchArchivedTasks,
  deselectTasks,
  cancelTimeLine
} from 'redux/store/tasks/tasks.actions'
import { deselectTags } from 'redux/store/tags/tags.actions'
import { fetchContacts, deselectContacts } from 'redux/store/contacts/contacts.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

import {
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxGroupItem,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
  MenuBoxLine,
} from './styles';

const AccountMenu = props => {

  const {
    location,
    onHandleClickArchive,
    onHandleClickContacts,
    onHandleClickEditProfile,
    onHandleClickChangePassword,
    onHandleClickLogOut,
  } = props

  return (
      <MenuBoxContainer>
        <MenuBoxGroup>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.ARCHIVED}
              iconScale={0.94}
              active={location === '/user/account/archive'}
              type='archivedTasks'
              onChange={onHandleClickArchive} />
            <MenuBoxItemTitle
              title="Archived Tasks"
              active={location === '/user/account/archive'}
              type='archivedTasks'
              onChange={onHandleClickArchive} />
          </MenuBoxGroupItem>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.CONTACTS}
              iconScale={0.53}
              active={location === '/user/account/contacts'}
              type='contactsList'
              onChange={onHandleClickContacts} />
            <MenuBoxItemTitle
              title="Contact List"
              active={location === '/user/account/contacts'}
              type='contactsList'
              onChange={onHandleClickContacts} />
          </MenuBoxGroupItem>
        </MenuBoxGroup>

        <MenuBoxLine/>

        <MenuBoxGroup>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.ACCOUNT}
              iconScale={0.72}
              active={location === '/user/account/edit-profile'}
              type='editProfile'
              onChange={onHandleClickEditProfile} />
            <MenuBoxItemTitle
              title="Edit My Profile"
              active={location === '/user/account/edit-profile'}
              type='editProfile'
              onChange={onHandleClickEditProfile} />
          </MenuBoxGroupItem>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.LOCK}
              iconScale={0.42}
              active={location === '/user/account/change-password'}
              type='changePassword'
              onChange={onHandleClickChangePassword} />
            <MenuBoxItemTitle
              title="Change Password"
              active={location === '/user/account/change-password'}
              type='changePassword'
              onChange={onHandleClickChangePassword} />
          </MenuBoxGroupItem>
        </MenuBoxGroup>

        <MenuBoxLine/>

        <MenuBoxGroup>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.LOG_OUT}
              iconScale={1}
              onChange={onHandleClickLogOut} />
            <MenuBoxItemTitle
              title="Log Out"
              onChange={onHandleClickLogOut} />
          </MenuBoxGroupItem>
        </MenuBoxGroup>
      </MenuBoxContainer>
  )
}

AccountMenu.propTypes = {
  location: PropTypes.string,
  onHandleClickArchive: PropTypes.func,
  onHandleClickContacts: PropTypes.func,
  onHandleClickEditProfile: PropTypes.func,
  onHandleClickChangePassword: PropTypes.func,
  onHandleClickLogOut: PropTypes.func,
}

const mapStateToProps = state => ({
  location: getRoutingPathname(state),
})

const mapDispatchToProps = {
  fetchArchivedTasks,
  deselectTasks,
  cancelTimeLine,
  deselectTags,
  fetchContacts,
  deselectContacts,
  hideArchivedTasks,
  changeLocation,
  logout
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleClickArchive: props => () => {
      props.deselectTasks()
      props.cancelTimeLine()
      props.deselectTags()
      props.deselectContacts()
      props.fetchArchivedTasks()
      props.changeLocation('/user/account/archive')
    },
    onHandleClickContacts: props => () => {
      props.hideArchivedTasks()
      props.deselectTasks()
      props.cancelTimeLine()
      props.deselectTags()
      props.fetchContacts()
      props.changeLocation('/user/account/contacts')
    },
    onHandleClickEditProfile: props => () => props.changeLocation('/user/account/edit-profile'),
    onHandleClickChangePassword: props => () => props.changeLocation('/user/account/change-password'),
    onHandleClickLogOut: props => () => props.logout(),
  })
)(AccountMenu)


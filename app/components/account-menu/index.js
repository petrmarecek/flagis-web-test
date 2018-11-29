import React from 'react'
import PropTypes from 'prop-types'
import { ICONS } from '../icons/icon-constants'

import { connect} from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { logout } from 'redux/store/auth/auth.actions'
import { hideArchivedTasks, changeLocation } from 'redux/store/app-state/app-state.actions'
import {
  fetchArchivedTasks,
  deselectTasks,
  cancelTimeLine
} from 'redux/store/tasks/tasks.actions'
import { deselectTags } from 'redux/store/tags/tags.actions'
import { deselectContacts } from 'redux/store/contacts/contacts.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

import LoggedAccount from 'components/common/logged-account'

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
    pathname,
    onHandleClickArchive,
    onHandleClickContacts,
    onHandleClickEditProfile,
    onHandleClickChangePassword,
    onHandleClickLogOut,
  } = props

  const archiveTemplate = '/user/account/archive'
  const numberArchiveTemplate = archiveTemplate.length
  const isArchiveActive = pathname.substring(0, numberArchiveTemplate) === archiveTemplate

  return (
    <div>
      <MenuBoxContainer>
        <MenuBoxGroup>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.ARCHIVED}
              iconScale={0.94}
              active={isArchiveActive}
              type='archivedTasks'
              onChange={onHandleClickArchive} />
            <MenuBoxItemTitle
              title="Archived Tasks"
              active={isArchiveActive}
              type='archivedTasks'
              onChange={onHandleClickArchive} />
          </MenuBoxGroupItem>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.CONTACTS}
              iconScale={0.53}
              active={pathname === '/user/account/contacts'}
              type='contactsList'
              onChange={onHandleClickContacts} />
            <MenuBoxItemTitle
              title="Contact List"
              active={pathname === '/user/account/contacts'}
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
              active={pathname === '/user/account/edit-profile'}
              type='editProfile'
              onChange={onHandleClickEditProfile} />
            <MenuBoxItemTitle
              title="Edit My Profile"
              active={pathname === '/user/account/edit-profile'}
              type='editProfile'
              onChange={onHandleClickEditProfile} />
          </MenuBoxGroupItem>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.LOCK}
              iconScale={0.42}
              active={pathname === '/user/account/change-password'}
              type='changePassword'
              onChange={onHandleClickChangePassword} />
            <MenuBoxItemTitle
              title="Change Password"
              active={pathname === '/user/account/change-password'}
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
      <LoggedAccount />
    </div>
  )
}

AccountMenu.propTypes = {
  pathname: PropTypes.string,
  onHandleClickArchive: PropTypes.func,
  onHandleClickContacts: PropTypes.func,
  onHandleClickEditProfile: PropTypes.func,
  onHandleClickChangePassword: PropTypes.func,
  onHandleClickLogOut: PropTypes.func,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = {
  fetchArchivedTasks,
  deselectTasks,
  cancelTimeLine,
  deselectTags,
  deselectContacts,
  hideArchivedTasks,
  changeLocation,
  logout
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleClickArchive: props => () => {
      props.deselectContacts()
      props.fetchArchivedTasks()
      props.changeLocation('/user/account/archive')
    },
    onHandleClickContacts: props => () => {
      props.hideArchivedTasks()
      props.deselectTasks()
      props.changeLocation('/user/account/contacts')
    },
    onHandleClickEditProfile: props => () => {
      props.hideArchivedTasks()
      props.deselectTasks()
      props.deselectContacts()
      props.changeLocation('/user/account/edit-profile')
    },
    onHandleClickChangePassword: props => () => {
      props.hideArchivedTasks()
      props.deselectTasks()
      props.deselectContacts()
      props.changeLocation('/user/account/change-password')
    },
    onHandleClickLogOut: props => () => props.logout(),
  })
)(AccountMenu)


import React from 'react'
import PropTypes from 'prop-types'
import { ICONS } from '../icons/icon-constants'
import {
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
  MenuBoxLine,
} from './styles';

const AccountMenu = ({ content, onChange, onLogOut }) => {

  return (
      <MenuBoxContainer>
        <MenuBoxGroup>
          <MenuBoxItemIcon
            icon={ICONS.ARCHIVED}
            iconScale={0.83}
            active={content === 'archivedTasks'}
            type='archivedTasks'
            onChange={onChange} />
          <MenuBoxItemTitle
            title="Archived Tasks"
            active={content === 'archivedTasks'}
            type='archivedTasks'
            onChange={onChange} />
        </MenuBoxGroup>
        <MenuBoxGroup>
          <MenuBoxItemIcon
            icon={ICONS.CONTACTS}
            iconScale={0.5}
            active={content === 'contactsList'}
            type='contactsList'
            onChange={onChange} />
          <MenuBoxItemTitle
            title="Contact List"
            active={content === 'contactsList'}
            type='contactsList'
            onChange={onChange} />
        </MenuBoxGroup>
        <MenuBoxLine/>

        <MenuBoxGroup>
          <MenuBoxItemIcon
            icon={ICONS.ACCOUNT}
            iconScale={0.73}
            active={content === 'editProfile'}
            type='editProfile'
            onChange={onChange} />
          <MenuBoxItemTitle
            title="Edit My Profile"
            active={content === 'editProfile'}
            type='editProfile'
            onChange={onChange} />
        </MenuBoxGroup>
        <MenuBoxGroup>
          <MenuBoxItemIcon
            icon={ICONS.LOCK}
            iconScale={0.39}
            active={content === 'changePassword'}
            type='changePassword'
            onChange={onChange} />
          <MenuBoxItemTitle
            title="Change Password"
            active={content === 'changePassword'}
            type='changePassword'
            onChange={onChange} />
        </MenuBoxGroup>
        <MenuBoxLine/>

        <MenuBoxGroup>
          <MenuBoxItemIcon
            icon={ICONS.LOG_OUT}
            iconScale={0.94}
            onChange={onLogOut} />
          <MenuBoxItemTitle
            title="Log Out"
            onChange={onLogOut} />
        </MenuBoxGroup>
      </MenuBoxContainer>
  )
}

AccountMenu.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func,
  onLogOut: PropTypes.func,
}

export default AccountMenu

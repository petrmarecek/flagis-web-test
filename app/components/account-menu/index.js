import React from 'react'
import PropTypes from 'prop-types'
import { ICONS } from '../icons/icon-constants'
import {
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxGroupItem,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
  MenuBoxLine,
} from './styles';

const AccountMenu = ({ content, onChange, onLogOut }) => {

  return (
      <MenuBoxContainer>
        <MenuBoxGroup>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.ARCHIVED}
              iconScale={0.94}
              active={content === 'archivedTasks'}
              type='archivedTasks'
              onChange={onChange} />
            <MenuBoxItemTitle
              title="Archived Tasks"
              active={content === 'archivedTasks'}
              type='archivedTasks'
              onChange={onChange} />
          </MenuBoxGroupItem>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.CONTACTS}
              iconScale={0.53}
              active={content === 'contactsList'}
              type='contactsList'
              onChange={onChange} />
            <MenuBoxItemTitle
              title="Contact List"
              active={content === 'contactsList'}
              type='contactsList'
              onChange={onChange} />
          </MenuBoxGroupItem>
        </MenuBoxGroup>

        <MenuBoxLine/>

        <MenuBoxGroup>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.ACCOUNT}
              iconScale={0.72}
              active={content === 'editProfile'}
              type='editProfile'
              onChange={onChange} />
            <MenuBoxItemTitle
              title="Edit My Profile"
              active={content === 'editProfile'}
              type='editProfile'
              onChange={onChange} />
          </MenuBoxGroupItem>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.LOCK}
              iconScale={0.42}
              active={content === 'changePassword'}
              type='changePassword'
              onChange={onChange} />
            <MenuBoxItemTitle
              title="Change Password"
              active={content === 'changePassword'}
              type='changePassword'
              onChange={onChange} />
          </MenuBoxGroupItem>
        </MenuBoxGroup>

        <MenuBoxLine/>

        <MenuBoxGroup>
          <MenuBoxGroupItem>
            <MenuBoxItemIcon
              icon={ICONS.LOG_OUT}
              iconScale={1}
              onChange={onLogOut} />
            <MenuBoxItemTitle
              title="Log Out"
              onChange={onLogOut} />
          </MenuBoxGroupItem>
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

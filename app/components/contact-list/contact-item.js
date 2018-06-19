import React from 'react'
import PropTypes from 'prop-types'

import {
  ContactItemStyle,
  ContactItemContainer,
  ContactItemIcon,
  ContactItemTitle,
} from './styles'

import Icon from '../icons/icon'
import {ICONS} from '../icons/icon-constants'

const ContactItem = ({ contact, onHandleClick }) => {
  const isUser = contact.nickname !== 'null null'
  let icon = {
    icon: ICONS.CONTACT_EXIST,
    height: 21,
    width: 21,
    scale: 1,
    color: ['#8C9DA9', '#fff'],
  }

  if (contact.nickname === 'null null') {
    icon = {
      icon: ICONS.CONTACT_NOT_EXIST,
      height: 21,
      width: 25,
      scale: 0.92,
      color: ['#8C9DA9', '#fff', '#FF6A6A'],
    }
  }

  return(
    <ContactItemStyle
      key={contact.id}
      onClick={onHandleClick}>
      <ContactItemContainer>
        <ContactItemIcon>
          <Icon
            icon={icon.icon}
            width={icon.width}
            height={icon.height}
            scale={icon.scale}
            color={icon.color}/>
        </ContactItemIcon>
        <ContactItemTitle isUser={isUser}>{contact.email}</ContactItemTitle>
      </ContactItemContainer>
    </ContactItemStyle>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object,
  onHandleClick: PropTypes.func,
}

export default ContactItem

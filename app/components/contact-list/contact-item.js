import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, withHandlers } from 'recompose'

import {
  ContactItemStyle,
  ContactItemContainer,
  ContactItemIcon,
  ContactItemTitle,
} from './styles'

import Icon from '../icons/icon'
import {ICONS} from '../icons/icon-constants'
import velocity from 'velocity-animate'

const ContactItem = ({ contact, onHandleClick }) => {
  const isUser = contact.nickname !== 'null null'
  let icon = {
    icon: ICONS.CONTACT_EXIST,
    height: 21,
    width: 21,
    color: ['#8C9DA9', '#fff'],
  }

  if (!isUser) {
    icon = {
      icon: ICONS.CONTACT_NOT_EXIST,
      height: 23,
      width: 28,
      color: ['#8C9DA9', '#fff', '#FF6A6A'],
    }
  }

  const title = isUser
    ? contact.nickname
    : contact.email

  return(
    <ContactItemStyle
      id={contact.id}
      key={contact.id}
      onClick={onHandleClick}>
      <ContactItemContainer>
        <ContactItemIcon>
          <Icon
            icon={icon.icon}
            width={icon.width}
            height={icon.height}
            color={icon.color} />
        </ContactItemIcon>
        <ContactItemTitle isUser={isUser}>{title}</ContactItemTitle>
      </ContactItemContainer>
    </ContactItemStyle>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object,
  onHandleClick: PropTypes.func,
  onClick: PropTypes.func,
}

export default compose(
  withHandlers({
    onHandleClick: props => () => props.onClick(props.contact.id)
  }),
  lifecycle({
    componentDidMount() {
      const elem = document.getElementById(this.props.contact.id)
      velocity(elem, 'transition.slideUpIn', { duration: 400 })
    }
  })
)(ContactItem)

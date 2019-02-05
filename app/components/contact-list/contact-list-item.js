import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

import {
  ContactItemContainer,
  ContactItemIcon,
  ContactItemTitleWrapper,
  ContactItemTitle,
  ContactItemInvite,
  ContactItemInviteIcon,
  ContactItemInviteText
} from './styles'

import { ICONS } from '../icons/icon-constants'

const ContactItem = ({ contact, onHandleClickContact, onHandleClickInvitation }) => {
  let icon = {
    icon: ICONS.CONTACT_EXIST,
    height: 21,
    width: 21,
    color: ['#8C9DA9', '#fff'],
  }

  if (!contact.isUser) {
    icon = {
      icon: ICONS.CONTACT_NO_EXIST,
      height: 23,
      width: 28,
      color: ['#8C9DA9', '#fff', '#FF6A6A'],
    }
  }

  const title = contact.nickname !== null
    ? contact.nickname
    : contact.email

  return(
    <ContactItemContainer
      key={contact.id}
      onClick={onHandleClickContact}>
      <ContactItemIcon
        icon={icon.icon}
        width={icon.width}
        height={icon.height}
        color={icon.color} />
      <ContactItemTitleWrapper>
        <ContactItemTitle isUser={contact.isUser}>{title}</ContactItemTitle>
      </ContactItemTitleWrapper>
      {!contact.isInvited && !contact.isUser &&
      <ContactItemInvite onClick={onHandleClickInvitation}>
        <ContactItemInviteIcon
          icon={ICONS.SEND_INVITE}
          width={17}
          height={16}
          color={['#8C9DA9']} />
        <ContactItemInviteText>Invite</ContactItemInviteText>
      </ContactItemInvite>}
    </ContactItemContainer>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object,
  onClickContact: PropTypes.func,
  onHandleClickContact: PropTypes.func,
  onClickInvitation: PropTypes.func,
  onHandleClickInvitation: PropTypes.func,
}

export default compose(
  withHandlers({
    onHandleClickContact: props => () => props.onClickContact(props.contact.id),
    onHandleClickInvitation: props => event => {
      event.stopPropagation()
      props.onClickInvitation(props.contact.id)
    }
  }),
)(ContactItem)
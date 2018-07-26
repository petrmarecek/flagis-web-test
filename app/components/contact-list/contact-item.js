import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, withHandlers } from 'recompose'

import {
  ContactItemContainer,
  ContactItemIcon,
  ContactItemTitleWrapper,
  ContactItemTitle,
  ContactItemInvite,
  ContactItemInviteIcon,
  ContactItemInviteText
} from './styles'

import {ICONS} from '../icons/icon-constants'
import velocity from 'velocity-animate'

const ContactItem = ({ contact, onHandleClickContact, onHandleClickInvitation }) => {
  let icon = {
    icon: ICONS.CONTACT_EXIST,
    height: 21,
    width: 21,
    color: ['#8C9DA9', '#fff'],
  }

  if (!contact.isUser) {
    icon = {
      icon: ICONS.CONTACT_NOT_EXIST,
      height: 23,
      width: 28,
      color: ['#8C9DA9', '#fff', '#FF6A6A'],
    }
  }

  const title = contact.nickname !== ''
    ? contact.nickname
    : contact.email

  return(
    <ContactItemContainer
      id={contact.id}
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
      {!contact.isInvitation && !contact.isUser &&
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
  lifecycle({
    componentDidMount() {
      const elem = document.getElementById(this.props.contact.id)
      velocity(elem, 'transition.slideUpIn', { duration: 400 })
    }
  })
)(ContactItem)

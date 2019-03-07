import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

// components
import Avatar from 'react-avatar'
import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

// styles
import {
  ContactItemContainer,
  ContactItemIcon,
  ContactItemTitleWrapper,
  ContactItemTitle,
  ContactItemInvite,
  ContactItemInviteIcon,
  ContactItemInviteText,
} from './styles'

const ContactListItem = ({
  contact,
  onHandleClickContact,
  onHandleClickInvitation,
}) => (
  <ContactItemContainer key={contact.id} onClick={onHandleClickContact}>
    <ContactItemIcon>
      {contact.isUser ? (
        <Avatar
          src={contact.photo}
          name={contact.nickname !== null ? contact.nickname : contact.email}
          size={21}
          textSizeRatio={2}
          round
        />
      ) : (
        <Icon
          icon={ICONS.CONTACT_NO_EXIST}
          width={28}
          height={23}
          color={['#b1b5b8', '#fff', '#FF6A6A']}
        />
      )}
    </ContactItemIcon>
    <ContactItemTitleWrapper>
      <ContactItemTitle isUser={contact.isUser}>
        {contact.nickname !== null ? contact.nickname : contact.email}
      </ContactItemTitle>
    </ContactItemTitleWrapper>
    {!contact.isInvited && !contact.isUser && (
      <ContactItemInvite onClick={onHandleClickInvitation}>
        <ContactItemInviteIcon
          icon={ICONS.SEND_INVITE}
          width={17}
          height={16}
          color={['#b1b5b8']}
        />
        <ContactItemInviteText>Invite</ContactItemInviteText>
      </ContactItemInvite>
    )}
  </ContactItemContainer>
)

ContactListItem.propTypes = {
  contact: PropTypes.object,
  onClickContact: PropTypes.func,
  onHandleClickContact: PropTypes.func,
  onClickInvitation: PropTypes.func,
  onHandleClickInvitation: PropTypes.func,
}

export default withHandlers({
  onHandleClickContact: props => () => props.onClickContact(props.contact.id),
  onHandleClickInvitation: props => event => {
    event.stopPropagation()
    props.onClickInvitation(props.contact.id)
  },
})(ContactListItem)

import React from 'react'
import PropTypes from 'prop-types'
import constants from 'utils/constants'
import { toast } from 'react-toastify'
import { successMessages } from 'utils/messages'
import { compose, branch, renderComponent, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { setDetail } from 'redux/store/app-state/app-state.actions'
import {
  selectContact,
  sendInvitationContact,
} from 'redux/store/contacts/contacts.actions'
import { getVisibleContacts } from 'redux/store/contacts/contacts.selectors'

// components
import ContactListItem from './contact-list-item'
import ShadowScrollbar from '../common/shadow-scrollbar'
import Loader from '../common/loader'

// styles
import { EmptyList } from 'components/styled-components-mixins'

const ContactListContainer = ({
  contacts,
  onHandleClickContact,
  onHandleClickInvitation,
}) => {
  if (contacts.items.length === 0) {
    return <EmptyList>No contacts found</EmptyList>
  }

  const scrollStyle = {
    height: `calc(100vh - 114px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px rgba(239, 239, 239, 1)',
    boxShadowBottom: 'inset 0 -10px 10px -5px  rgba(239, 239, 239, 1)',
    overflow: 'hidden',
  }

  return (
    <ShadowScrollbar style={scrollStyle}>
      <ul>
        {contacts.items.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            onClickContact={onHandleClickContact}
            onClickInvitation={onHandleClickInvitation}
          />
        ))}
      </ul>
    </ShadowScrollbar>
  )
}

ContactListContainer.propTypes = {
  contacts: PropTypes.object,
  onHandleClickContact: PropTypes.func,
  onHandleClickInvitation: PropTypes.func,
}

const mapStateToProps = state => ({
  contacts: getVisibleContacts(state),
})

const mapDispatchToProps = {
  setDetail,
  selectContact,
  sendInvitationContact,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  branch(props => props.contacts.isFetching, renderComponent(Loader)),
  withHandlers({
    onHandleClickContact: props => id => {
      props.selectContact(id)
      props.setDetail('contact')
    },
    onHandleClickInvitation: props => id => {
      props.sendInvitationContact(id)
      toast.success(successMessages.contacts.sendInvitation, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_SUCCESS_DURATION,
      })
    },
  })
)(ContactListContainer)

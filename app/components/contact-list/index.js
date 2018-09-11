import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDetail } from 'redux/store/app-state/app-state.actions'
import { selectContact, sendInvitationContact } from 'redux/store/contacts/contacts.actions'
import { getVisibleContacts } from 'redux/store/contacts/contacts.selectors'
import { compose, branch, renderComponent, withHandlers } from 'recompose'
import { toast } from 'react-toastify'
import { successMessages } from 'utils/messages'
import constants from 'utils/constants'

import ContactItem from './contact-item'
import ShadowScrollbar from '../common/shadow-scrollbar'
import Loader from '../common/loader'

const ContactList = ({ contacts, onHandleClickContact, onHandleClickInvitation }) => {

  if (contacts.items.length === 0) {
    return (
      <div className="empty-list">No contacts found</div>
    )
  }

  const scrollStyle = {
    height: `calc(100vh - 152px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px rgba(231, 236, 237, 1)',
    boxShadowBottom: 'inset 0 -10px 10px -5px  rgba(231, 236, 237, 1)',
    overflow: 'hidden'
  }

  return (
    <ShadowScrollbar style={scrollStyle}>
      {contacts.items.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onClickContact={onHandleClickContact}
          onClickInvitation={onHandleClickInvitation} />
      ))}
    </ShadowScrollbar>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.object,
  onHandleClickContact: PropTypes.func,
  onHandleClickInvitation: PropTypes.func,
}

const mapStateToProps = state => ({
  contacts: getVisibleContacts(state)
})

const mapDispatchToProps = {
  setDetail,
  selectContact,
  sendInvitationContact,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    props => props.contacts.isFetching,
    renderComponent(Loader)
  ),
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
    }
  })
)(ContactList)

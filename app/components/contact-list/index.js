import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDetail } from 'redux/store/app-state/app-state.actions'
import { selectContact } from 'redux/store/contacts/contacts.actions'
import { getContacts } from 'redux/store/contacts/contacts.selectors'
import { compose, branch, renderComponent, withHandlers } from 'recompose'

import ContactItem from './contact-item'
import Loader from '../elements/loader'

const ContactList = ({ contacts, onHandleClick }) => {

  if (contacts.items.size === 0) {
    return (
      <div className="empty-list">No contacts found</div>
    )
  }

  return contacts.items.map(contact => (
    <ContactItem
      key={contact.id}
      contact={contact}
      onHandleClick={onHandleClick} />
  ))
}

ContactList.propTypes = {
  contacts: PropTypes.object,
  onHandleClick: PropTypes.func,
}

const mapStateToProps = state => ({
  contacts: getContacts(state)
})

const mapDispatchToProps = {
  setDetail,
  selectContact,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    props => props.contacts.isFetching,
    renderComponent(Loader)
  ),
  withHandlers({
    onHandleClick: props => id => {
      props.selectContact(id)
      props.setDetail('contact')
    }
  })
)(ContactList)

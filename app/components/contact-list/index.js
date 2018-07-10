import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setDetail } from 'redux/store/app-state/app-state.actions'
import { selectContact } from 'redux/store/contacts/contacts.actions'
import { getContacts } from 'redux/store/contacts/contacts.selectors'
import { compose, branch, renderComponent, withHandlers } from 'recompose'

import ContactItem from './contact-item'
import ShadowScrollbar from '../common/shadow-scrollbar'
import Loader from '../common/loader'

const ContactList = ({ contacts, onHandleClick }) => {

  if (contacts.items.size === 0) {
    return (
      <div className="empty-list">No contacts found</div>
    )
  }

  const scrollStyle = {
    height: `calc(100vh - 152px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 20px 20px -10px rgba(231, 236, 237, 1)',
    boxShadowBottom: 'inset 0 -20px 20px -10px  rgba(231, 236, 237, 1)',
    overflow: 'hidden'
  }

  return (
    <ShadowScrollbar style={scrollStyle}>
      {contacts.items.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onClick={onHandleClick} />
      ))}
    </ShadowScrollbar>
  )
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

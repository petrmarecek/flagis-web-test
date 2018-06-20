import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import ContactDetail from './contact-detail'

import { getDetail } from 'redux/store/app-state/app-state.selectors'
import {
  selectContact,
  deselectContacts,
  updateContact
} from 'redux/store/contacts/contacts.actions'
import {
  getCurrentContact,
  getNextContact,
  getPreviousContact
} from 'redux/store/contacts/contacts.selectors'

const Detail = props => {

  const {
    detail,
    contact,
    onHandleToggleContactList,
    onHandleNextContact,
    onHandlePreviousContact,
    onHandleContactDescriptionUpdate,
    onHandleContactNicknameUpdate,
  } = props

  if (detail.contact) {
    return (
      <ContactDetail
        contact={contact}
        onHandleToggleContactList={onHandleToggleContactList}
        onHandleNextContact={onHandleNextContact}
        onHandlePreviousContact={onHandlePreviousContact}
        onHandleContactDescriptionUpdate={onHandleContactDescriptionUpdate}
        onHandleContactNicknameUpdate={onHandleContactNicknameUpdate} />
    )
  }

  return ( <div>'Detail not found'</div> )
}

Detail.propTypes = {
  detail: PropTypes.object,
  contact: PropTypes.object,
  onHandleToggleContactList: PropTypes.func,
  onHandleNextContact: PropTypes.func,
  onHandlePreviousContact: PropTypes.func,
  onHandleContactDescriptionUpdate: PropTypes.func,
  onHandleContactNicknameUpdate: PropTypes.func,
}

const mapStateToProps = state => ({
  detail: getDetail(state),
  contact: getCurrentContact(state),
  nextContact: getNextContact(state),
  previousContact: getPreviousContact(state),
})

const mapDispatchToProps = {
  selectContact,
  deselectContacts,
  updateContact,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    // Contacts
    onHandleToggleContactList: props => () => props.deselectContacts(),
    onHandleNextContact: props => () => {
      if (!props.nextContact) {
        return
      }

      props.selectContact(props.nextContact.id)
    },
    onHandlePreviousContact: props => () => {
      if (!props.previousContact) {
        return
      }

      props.selectContact(props.previousContact.id)
    },
    onHandleContactDescriptionUpdate: props => data => {
      props.updateContact(data.contact, data.description, 'description')
    },
    onHandleContactNicknameUpdate: props => data => {
      props.updateContact(data.contact, data.nickname, 'nickname')
    },
  }),
)(Detail)

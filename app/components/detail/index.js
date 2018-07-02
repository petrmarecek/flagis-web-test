import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle, withHandlers } from 'recompose'

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
import { DetailStyle } from './styles'

const Detail = props => {

  const {
    detail,
    onHandleAddEventListener,
    onHandleRemoveEventListener,

    // contacts
    contact,
    onHandleToggleContactList,
    onHandleNextContact,
    onHandlePreviousContact,
    onHandleContactDescriptionUpdate,
    onHandleContactNicknameUpdate,
  } = props

  if (detail.contact) {
    return (
      <DetailStyle
        innerRef={comp => { this.detail = comp }}
        onClick={onHandleAddEventListener}>
        <ContactDetail
          contact={contact}
          onHandleRemoveEventListener={onHandleRemoveEventListener}
          onHandleToggleContactList={onHandleToggleContactList}
          onHandleNextContact={onHandleNextContact}
          onHandlePreviousContact={onHandlePreviousContact}
          onHandleContactDescriptionUpdate={onHandleContactDescriptionUpdate}
          onHandleContactNicknameUpdate={onHandleContactNicknameUpdate} />
      </DetailStyle>
    )
  }

  return <div>Detail not found</div>
}

Detail.propTypes = {
  detail: PropTypes.object,
  onHandleKeyDown: PropTypes.func,
  onHandleAddEventListener: PropTypes.func,
  onHandleRemoveEventListener: PropTypes.func,
  onHandleClickOutSide: PropTypes.func,

  // contacts
  contact: PropTypes.object,
  onHandleToggleContactList: PropTypes.func,
  onHandleNextContact: PropTypes.func,
  onHandlePreviousContact: PropTypes.func,
  onHandleContactDescriptionUpdate: PropTypes.func,
  onHandleContactNicknameUpdate: PropTypes.func,
}

const mapStateToProps = state => ({
  detail: getDetail(state),

  // contacts
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
    onHandleContactDescriptionUpdate: props => data =>
      props.updateContact(data.contact, data.description, 'description'),
    onHandleContactNicknameUpdate: props => data =>
      props.updateContact(data.contact, data.nickname, 'nickname'),
  }),
  withHandlers({
    onHandleKeyDown: props => event => {
      if (event.repeat) {
        return
      }

      switch (event.which) {
        // escape
        case 27:
          props.onHandleToggleContactList()
          return

        // backspace
        case 8:
          props.onHandleToggleContactList()
          return

        // arrow left key
        case 37:
          props.onHandlePreviousContact()
          return

        // arrow right key
        case 39:
          props.onHandleNextContact()
          return

        default:
          return
      }
    }
  }),
  withHandlers({
    onHandleClickOutSide: props => event => {
      const detail = findDOMNode(this.detail)

      if (!detail.contains(event.target)) {
        document.removeEventListener('keydown', props.onHandleKeyDown, false)
      }
    }
  }),
  withHandlers({
    onHandleAddEventListener: props => () => {
      document.getElementById('user-container').addEventListener('click', props.onHandleClickOutSide, false)
      document.addEventListener('keydown', props.onHandleKeyDown, false)
    },
    onHandleRemoveEventListener: props => event => {
      event.stopPropagation()
      document.removeEventListener('keydown', props.onHandleKeyDown, false)
    }
  }),
  lifecycle({
    componentDidMount() {
      document.getElementById('user-container').addEventListener('click', this.props.onHandleClickOutSide, false)
      document.addEventListener('keydown', this.props.onHandleKeyDown, false)
    },
    componentWillUnmount() {
      document.getElementById('user-container').removeEventListener('click', this.props.onHandleClickOutSide, false)
      document.removeEventListener('keydown', this.props.onHandleKeyDown, false)
    }
  })
)(Detail)

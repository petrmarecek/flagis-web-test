import React from 'react'
import PropTypes from 'prop-types'
import { compose, branch, renderComponent, withHandlers } from 'recompose'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// redux
import { connect } from 'react-redux'
import {
  setDetail,
  setScrollbarPosition,
} from 'redux/store/app-state/app-state.actions'
import { getScrollbarPosition } from 'redux/store/app-state/app-state.selectors'
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
  scrollbarPosition,
  onHandleClickContact,
  onHandleClickInvitation,
  onHandleSetScrollbarPosition,
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
    <ShadowScrollbar
      style={scrollStyle}
      position={scrollbarPosition}
      setPosition={onHandleSetScrollbarPosition}
    >
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
  scrollbarPosition: PropTypes.number,
  onHandleClickContact: PropTypes.func,
  onHandleClickInvitation: PropTypes.func,
  onHandleSetScrollbarPosition: PropTypes.func,
}

const mapStateToProps = state => ({
  contacts: getVisibleContacts(state),
  scrollbarPosition: getScrollbarPosition(state, 'contact'),
})

const mapDispatchToProps = {
  setDetail,
  selectContact,
  sendInvitationContact,
  setScrollbarPosition,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(props => props.contacts.isFetching, renderComponent(Loader)),
  withHandlers({
    onHandleClickContact: props => id => {
      props.selectContact(id)
      props.setDetail('contact')
    },
    onHandleClickInvitation: props => id => {
      props.sendInvitationContact(id)
      toast.success(toastCommon.successMessages.contacts.sendInvitation, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.SUCCESS_DURATION,
      })
    },
    onHandleSetScrollbarPosition: props => position =>
      props.setScrollbarPosition('contact', position),
  })
)(ContactListContainer)

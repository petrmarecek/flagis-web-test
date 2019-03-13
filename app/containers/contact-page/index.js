import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import {
  setDetail,
  primaryHiddenNavigationVisible,
  setPrimaryHiddenNavigationAnimation,
} from 'redux/store/app-state/app-state.actions'
import { selectContact } from 'redux/store/contacts/contacts.actions'
import { changeLocation } from 'redux/store/routing/routing.actions'
import { getPrimaryHiddenNavigationVisibility } from 'redux/store/app-state/app-state.selectors'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import {
  getContactsItems,
  getCurrentContactId,
} from 'redux/store/contacts/contacts.selectors'

// components
import CenterPanel from 'components/panels/center-panel'
import DetailContent from 'components/contents/detail-content'
import ContactContent from 'components/contents/contact-content'

const ContactPage = ({ contactsItems, pathname }) => {
  const template = '/user/contacts/'
  const numberTemplate = template.length
  const contactId = pathname.substring(numberTemplate)
  const isContactId = contactsItems.includes(contactId)

  return (
    <CenterPanel>
      {isContactId ? <DetailContent /> : <ContactContent />}
    </CenterPanel>
  )
}

ContactPage.propTypes = {
  contactsItems: PropTypes.object,
  pathname: PropTypes.string,
}

const mapStateToProps = state => ({
  contactsItems: getContactsItems(state),
  currentContactId: getCurrentContactId(state),
  pathname: getRoutingPathname(state),
  isNavigationPrimaryMoreVisible: getPrimaryHiddenNavigationVisibility(state),
})

const mapDispatchToProps = {
  changeLocation,
  setDetail,
  selectContact,
  primaryHiddenNavigationVisible,
  setPrimaryHiddenNavigationAnimation,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.isNavigationPrimaryMoreVisible) {
        this.props.primaryHiddenNavigationVisible()
        this.props.setPrimaryHiddenNavigationAnimation()
      }
    },
    componentDidUpdate() {
      const { contactsItems, pathname, currentContactId } = this.props

      // redirect to tasks
      if (pathname === routes.user.tasks) {
        this.props.changeLocation(routes.user.tasks)
        return
      }

      let template = '/user/contacts/'
      const numberTemplate = template.length
      const contactId = pathname.substring(numberTemplate)
      const isContactId = contactsItems.includes(contactId)

      if (!isContactId) {
        template = routes.user.contacts

        if (contactsItems.size === 0) {
          return
        }

        if (pathname !== template) {
          this.props.changeLocation(template)
        }

        return
      }

      if (currentContactId === contactId) {
        return
      }

      this.props.selectContact(contactId)
      this.props.setDetail('contact')
    },
  })
)(ContactPage)

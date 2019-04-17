import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { updateContactSearch } from 'redux/store/contacts/contacts.actions'
import { getContactsSearch } from 'redux/store/contacts/contacts.selectors'

// components
import SearchBox from 'components/common/search-box'
import AddContactForm from '../common/add-contact-fom'
import ContactListContainer from '../contact-list'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPanelScroll,
  CenterPageTitle,
} from '../panels/styles'

const ContactContent = ({ search, onHandleSearchChange }) => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary smallOffsetPadding>
        <CenterPageTitle>Contacts</CenterPageTitle>
        <SearchBox onChange={onHandleSearchChange} value={search} />
      </CenterPanelTopPrimary>
      <AddContactForm />
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={104} offsetBottom={10}>
      <ContactListContainer />
    </CenterPanelScroll>
  </div>
)

ContactContent.propTypes = {
  search: PropTypes.string,
  onHandleSearchChange: PropTypes.func,
}

const mapStateToProps = state => ({
  search: getContactsSearch(state),
})

const mapDispatchToProps = { updateContactSearch }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleSearchChange: props => search => props.updateContactSearch(search),
  })
)(ContactContent)

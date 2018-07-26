import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { updateContactSearch } from 'redux/store/contacts/contacts.actions'
import { getContactsSearch } from 'redux/store/contacts/contacts.selectors'

import SearchBox from 'components/common/search-box'
import AddContactForm from '../common/add-contact-fom'
import ContactList from '../contact-list'

import styled from 'styled-components'
import { CenterPanelTop, CenterPanelScroll } from '../panels/styles'

const ContactTopMenu= styled.div`
  height: 48px;
  position: relative;
`;

const ContactListContainer = styled.div`
  margin: 0 0 10px;
  clear: both;
`;

const ContactContent = ({ search, onHandleSearchChange }) => (
  <div>
    <CenterPanelTop>
      <ContactTopMenu>
        <SearchBox
          onChange={onHandleSearchChange}
          value={search} />
      </ContactTopMenu>
      <AddContactForm/>
    </CenterPanelTop>
    <CenterPanelScroll>
      <ContactListContainer>
        <ContactList/>
      </ContactListContainer>
    </CenterPanelScroll>
  </div>
)

ContactContent.propTypes = {
  search: PropTypes.string,
  onHandleSearchChange: PropTypes.func,
}

const mapStateToProps = state => ({
  search: getContactsSearch(state)
})

const mapDispatchToProps = { updateContactSearch }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleSearchChange: props => search => props.updateContactSearch(search)
  })
)(ContactContent)

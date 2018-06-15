import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { updateContactSearch } from 'redux/store/contacts/contacts.actions'

import SearchBox from 'components/elements/search-box'
import AddContactForm from '../elements/add-contact-fom'
import ContactList from '../contact-list'

import styled from 'styled-components'

const CenterPanelTop = styled.div`
  position: relative;
  z-index: 10;
`;

const ContactTopMenu= styled.div`
  height: 48px;
  position: relative;
`;

const CenterPanelScroll = styled.div`
  position: absolute;
  top: 0;
  bottom: 30px;
  left: 0;
  right: 0;
  top: 104px;
`;

const ContactListStyle = styled.div`
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
      <ContactListStyle>
        <ContactList/>
      </ContactListStyle>
    </CenterPanelScroll>
  </div>
)

ContactContent.propTypes = {
  search: PropTypes.string,
  updateContactSearch: PropTypes.func,
  onHandleSearchChange: PropTypes.func,
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { updateContactSearch }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleSearchChange: props => search => props.updateContactSearch(search)
  })
)(ContactContent)

import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import styled from 'styled-components'
import { placeholderColor, boxSizing, fontSub } from '../styled-components-mixins'

const Search = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SearchIcon = styled(Icon)`
  margin-left: 10px;
  flex-shrink: 0;
`;

const Input = styled.input`
  ${placeholderColor('#8c9da9')}
  ${boxSizing('border-box')}
  ${fontSub}
  font-size: 14px;
  margin: 0 0 0 12px;
  border: none;
  height: 26px;
  color: #293034;
  width: 100%;
  background-color: transparent;
`;

const SearchBox = ({ value, handleUpdate, handleKeyUp }) => (
  <Search>
    <SearchIcon
      icon={ICONS.MAGNIFIER}
      width={17}
      height={18}
      color={["#8C9DA9"]} />
    <Input
      id="search"
      type="text"
      name="search"
      placeholder='Full text search'
      autoComplete="off"
      value={value}
      onChange={handleUpdate}
      onKeyUp={handleKeyUp} />
  </Search>
)

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func,
  handleKeyUp: PropTypes.func,
}

export default withHandlers({
  handleUpdate: props => event => props.onChange(event.target.value),
  handleKeyUp: props => event => {
    switch (event.which) {
      // escape
      case 27:
        props.onChange('')
        return

      default:
        return
    }
  }
})(SearchBox)

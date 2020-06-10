import React from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import { withStateHandlers } from 'recompose'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import styled from 'styled-components'
import {
  placeholderColor,
  boxSizing,
  transition,
  fontSub,
} from '../styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

const Search = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const SearchIcon = styled(Icon)`
  margin-left: 10px;
  flex-shrink: 0;
`

const Input = styled.input`
  ${placeholderColor(colors.batman)}
  ${boxSizing('border-box')}
  ${transition('width 300ms ease-out')}
  ${fontSub}
  font-size: 14px;
  margin: 0;
  height: 26px;
  border: none;
  width: ${props => (props.isVisibleInput ? '250px' : '0')};
  color: ${colors.darkJungleGreen};
  background-color: transparent;
  border-bottom: 1px solid ${colors.darkJungleGreen};
  padding: ${props => (props.isVisibleInput ? '0 5px' : '0')};
  font-weight: 500;
`

const SearchBox = ({
  value,
  isVisibleInput,
  getInputRef,
  onHandleClickIcon,
  onHandleUpdate,
  onHandleKeyUp,
}) => (
  <Search>
    <Input
      ref={getInputRef}
      id="search"
      type="search"
      name="search"
      placeholder="Full text search"
      autoComplete="off"
      value={value}
      onChange={onHandleUpdate}
      onKeyUp={onHandleKeyUp}
      isVisibleInput={isVisibleInput}
    />
    <SearchIcon
      icon={ICONS.MAGNIFIER}
      width={17}
      height={18}
      color={['#676D71']}
      hoverColor={['#293034']}
      onClick={onHandleClickIcon}
    />
  </Search>
)

SearchBox.propTypes = {
  value: PropTypes.string,
  isVisibleInput: PropTypes.bool,
  getInputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onHandleClickIcon: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onHandleKeyUp: PropTypes.func,
}

export default withStateHandlers(
  props => ({ inputRef: null, isVisibleInput: props.value ? true : false }),
  {
    getInputRef: () => ref => ({ inputRef: ref }),
    onHandleClickIcon: ({ inputRef, isVisibleInput }) => () => {
      inputRef.focus()

      return {
        inputRef,
        isVisibleInput: !isVisibleInput,
      }
    },
    onHandleUpdate: (state, props) => event => {
      props.onChange(event.target.value)
      return {}
    },
    onHandleKeyUp: (state, props) => event => {
      switch (event.which) {
        // escape
        case 27:
          props.onChange('')
          return {}

        default:
          return {}
      }
    },
    handleClickOutside: ({ isVisibleInput }, props) => () => {
      if (!isVisibleInput && props.value) {
        return {}
      }

      if (props.value) {
        return {}
      }

      return { isVisibleInput: false }
    },
  }
)(onClickOutside(SearchBox))

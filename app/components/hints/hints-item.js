import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import { Hint } from './styles'

const HintsItem = ({ hint, dataType, selected, onHandleMouseOver, onHandleClickItem, onHandleKeyDown }) => {
  const itemValue = item => ({
    tags: item.title,
    contacts: item.email,
  })

  return (
    <Hint
      key={hint.id}
      onMouseOver={onHandleMouseOver}
      onClick={onHandleClickItem}
      onKeyDown={onHandleKeyDown}
      selected={selected}>{itemValue(hint)[dataType]}</Hint>
  )
}

HintsItem.propTypes = {
  hint: PropTypes.object,
  index: PropTypes.number,
  dataType: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onHandleMouseOver: PropTypes.func,
  onSubmit: PropTypes.func,
  onHandleClickItem: PropTypes.func,
  onHandleKeyDown: PropTypes.func,
}

export default withHandlers({
  onHandleMouseOver: props => () => props.onMouseOver(props.index),
  onHandleClickItem: props => () => props.onSubmit(),
})(HintsItem)

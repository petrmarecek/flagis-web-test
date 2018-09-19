import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import { Hint } from './styles'

const HintsItem = props => {
  const {
    hint,
    dataType,
    selected,
    getHintRef,
    onHandleMouseOver,
    onHandleClickItem,
    onHandleKeyDown
  } = props

  const itemValue = item => ({
    tags: item.title,
    contacts: !item.nickname ? item.email : item.nickname,
  })

  return (
    <Hint
      key={hint.id}
      innerRef={ref => getHintRef(ref)}
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
  addHintRef: PropTypes.func,
  getHintRef: PropTypes.func,
}

export default withHandlers({
  onHandleMouseOver: props => () => props.onMouseOver(props.index),
  onHandleClickItem: props => () => props.onSubmit(),
  getHintRef: props => ref => {
    if (props.selected) {
      props.addHintRef(ref)
    }
  },
})(HintsItem)

import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

// styles
import { ControlButton } from '../../styles'

const HeaderOne = props => {
  const { editorState } = props
  const style = 'header-three'
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  const isActive = style === blockType

  return (
    <ControlButton
      onMouseDown={event => props.onHandleToggle(style, event)}
      isActive={isActive}
      disabled={props.disabled}
    >
      H1
    </ControlButton>
  )
}

HeaderOne.propTypes = {
  onHandleToggle: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
}

export default withHandlers({
  onHandleToggle: props => (style, event) => {
    event.preventDefault()
    props.onToggle(style)
  },
})(HeaderOne)

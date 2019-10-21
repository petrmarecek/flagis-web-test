import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

// styles
import { ControlButton } from '../../styles'

const Underline = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  const style = 'UNDERLINE'
  const isActive = currentStyle.has(style)

  return (
    <ControlButton
      onMouseDown={event => props.onHandleToggle(style, event)}
      isActive={isActive}
      disabled={props.disabled}
    >
      U
    </ControlButton>
  )
}

Underline.propTypes = {
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
})(Underline)

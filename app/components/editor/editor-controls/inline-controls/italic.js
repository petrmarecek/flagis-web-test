import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

// styles
import { ControlButton } from '../../styles'

const Italic = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  const style = 'ITALIC'
  const isActive = currentStyle.has(style)

  return (
    <ControlButton
      onMouseDown={event => props.onHandleToggle(style, event)}
      isActive={isActive}
      style={{ fontStyle: 'italic' }}
    >
      I
    </ControlButton>
  )
}

Italic.propTypes = {
  onHandleToggle: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
}

export default withHandlers({
  onHandleToggle: props => (style, event) => {
    event.preventDefault()
    props.onToggle(style)
  },
})(Italic)

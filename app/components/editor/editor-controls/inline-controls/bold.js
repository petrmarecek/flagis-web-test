import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

// styles
import { ControlButton } from '../../styles'

const Bold = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  const style = 'BOLD'
  const isActive = currentStyle.has(style)

  return (
    <ControlButton
      onMouseDown={event => props.onHandleToggle(style, event)}
      isActive={isActive}
      disabled={props.disabled}
    >
      B
    </ControlButton>
  )
}

Bold.propTypes = {
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
})(Bold)

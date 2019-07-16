import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

// components
import { ICONS } from '../../../icons/icon-constants'
import Icon from '../../../icons/icon'

// styles
import { colors } from '../../../styled-components-mixins/colors'
import { ControlButton } from '../../styles'

const Highlight = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  const style = 'highlight'
  const isActive = currentStyle.has(style)
  const iconColor = isActive ? colors.darkJungleGreen : colors.astrocopusGrey

  return (
    <ControlButton
      onMouseDown={event => props.onHandleToggle(style, event)}
      isActive={isActive}
    >
      <Icon
        icon={ICONS.COLOR_PENCIL}
        width={16}
        height={11}
        color={[iconColor]}
        hoverColor={[colors.darkJungleGreen]}
      />
    </ControlButton>
  )
}

Highlight.propTypes = {
  onHandleToggle: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
}

export default withHandlers({
  onHandleToggle: props => (style, event) => {
    event.preventDefault()
    props.onToggle(style)
  },
})(Highlight)

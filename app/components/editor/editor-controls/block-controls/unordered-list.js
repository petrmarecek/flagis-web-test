import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

// components
import { ICONS } from '../../../icons/icon-constants'
import Icon from '../../../icons/icon'

// styles
import { colors } from '../../../styled-components-mixins/colors'
import { ControlButton } from '../../styles'

const UnorderedList = props => {
  const { editorState } = props
  const style = 'unordered-list-item'
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  const isActive = style === blockType
  const iconColor = isActive ? colors.darkJungleGreen : colors.astrocopusGrey

  return (
    <ControlButton
      onMouseDown={event => props.onHandleToggle(style, event)}
      isActive={isActive}
    >
      <Icon
        icon={ICONS.LIST}
        width={13}
        height={13}
        color={[iconColor]}
        hoverColor={[colors.darkJungleGreen]}
      />
    </ControlButton>
  )
}

UnorderedList.propTypes = {
  onHandleToggle: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
}

export default withHandlers({
  onHandleToggle: props => (style, event) => {
    event.preventDefault()
    props.onToggle(style)
  },
})(UnorderedList)

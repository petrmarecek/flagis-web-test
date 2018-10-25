import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import { DetailTagColorSelectorOptions, DetailTagColorSelectorItems } from './styles'

const TagDetailColors = ({ colors, colorIndex, onHandleSetColor }) => (
  <DetailTagColorSelectorOptions>
    {Object.values(colors).map((color, index) => (
      <DetailTagColorSelectorItems
        key={index}
        onClick={() => onHandleSetColor(index)}
        color={color} 
        selected={colorIndex === index} /> ))}
  </DetailTagColorSelectorOptions>
)

TagDetailColors.propTypes = {
  colors: PropTypes.object,
  colorIndex: PropTypes.number,
  setColor: PropTypes.func,
  onHandleSetColor: PropTypes.func,
}

export default withHandlers({
  onHandleSetColor: props => index => props.setColor(index),
})(TagDetailColors)

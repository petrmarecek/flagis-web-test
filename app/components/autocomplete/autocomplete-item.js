import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import { getColorIndex, getTagColor } from 'redux/utils/component-helper'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import { ItemTagContainer, Title } from './styles'

const AutocompleteItem = ({ item, dataType, onHandleDelete }) => {
  const colorIndex = getColorIndex(item.colorIndex, item.title)
  const tagColor = getTagColor(colorIndex)

  const getItem = {
    tags: (
      <ItemTagContainer key={item.id} tagColor={tagColor}>
        <Title>{item.title}</Title>
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={11}
          height={11}
          scale={0.78}
          color={["#fff"]}
          hoverColor={["#eee"]}
          onClick={onHandleDelete} />
      </ItemTagContainer>
    )
  }

  return getItem[dataType]
}

AutocompleteItem.propTypes = {
  item: PropTypes.object,
  dataType: PropTypes.string,
  onDelete: PropTypes.func,
  onHandleDelete: PropTypes.func,
}

export default withHandlers({
  onHandleDelete: props => event => {
    event.stopPropagation()
    props.onDelete(props.item)
  }
})(AutocompleteItem)

import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import { getColorIndex, getTagColor } from 'redux/utils/component-helper'
import { autocompleteLocations } from 'components/autocomplete/enums'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import {
  TagContainer,
  ContactContainer,
  Title,
  Delete,
  DeleteIcon,
} from './styles'

const AutocompleteItem = ({
  item,
  dataType,
  location,
  isHideDelete,
  onHandleDelete,
}) => {
  const colorIndex = getColorIndex(item.colorIndex, item.title)
  const tagColor = getTagColor(colorIndex)
  const contactTitle = !item.nickname ? item.email : item.nickname
  const mainSearch = location === autocompleteLocations.MAIN_SEARCH

  const getItem = {
    tags: (
      <TagContainer key={item.id} tagColor={tagColor} mainSearch={mainSearch}>
        <Title color={'#fff'}>{item.title}</Title>
        {!isHideDelete && (
          <Icon
            icon={ICONS.CROSS_SIMPLE}
            width={11}
            height={11}
            scale={0.78}
            color={['#fff']}
            onClick={onHandleDelete}
          />
        )}
      </TagContainer>
    ),
    contacts: (
      <ContactContainer key={item.id}>
        <Title color={'#293034'}>{contactTitle}</Title>
        {!isHideDelete && (
          <Delete onClick={onHandleDelete}>
            <DeleteIcon
              icon={ICONS.CROSS_SIMPLE}
              width={6}
              height={6}
              scale={0.42}
              color={['#8c9da9']}
            />
          </Delete>
        )}
      </ContactContainer>
    ),
  }

  return getItem[dataType]
}

AutocompleteItem.propTypes = {
  item: PropTypes.object,
  dataType: PropTypes.string,
  location: PropTypes.string,
  isHideDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  onHandleDelete: PropTypes.func,
}

export default withHandlers({
  onHandleDelete: props => event => {
    event.stopPropagation()
    props.onDelete(props.item)
  },
})(AutocompleteItem)

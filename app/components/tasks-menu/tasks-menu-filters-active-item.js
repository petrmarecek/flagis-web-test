import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import Autocomplete from 'components/autocomplete'

import {
  FilterActiveItem,
  FilterActiveItemIcon,
  FilterActiveItemTitle,
  FilterActiveItemAutocomplete,
} from './styles'

const TasksMenuFiltersActiveItem = ({ title, isMounted, onHandleDelete }) => {
  const isAssignee = title === 'assignee'
  const renameTitle = filterTitle => {
    switch (filterTitle) {
      case ('assignee'):
      filterTitle = 'Assignee to:'
        break;

      case ('today'):
      filterTitle = 'Today'
        break;

      case ('week'):
      filterTitle = 'This week'
        break;

      case ('month'):
      filterTitle = 'This month'
        break;

      case ('unimportant'):
      filterTitle = 'Normal'
        break;

      case ('noTags'):
      filterTitle = 'No tags'
        break;

      default:
      filterTitle = 'Bold'
    }

    return filterTitle
  }

  return (
    <FilterActiveItem isMounted={isMounted}>
      {isAssignee &&
      <FilterActiveItemIcon>
        <Icon
          icon={ICONS.FOLLOWER_NEW}
          width={14}
          height={16}
          scale={0.66}
          color={['#8c9ea9']}
          onClick={onHandleDelete} />
      </FilterActiveItemIcon>}
      <FilterActiveItemTitle isAssignee={isAssignee}>
        {renameTitle(title)}
      </FilterActiveItemTitle>
      {isAssignee &&
      <FilterActiveItemAutocomplete>
        <Autocomplete
          dataType="contacts"
          location="tasksMenuFilterContacts"
          placeholder="Select Contact"
          selectedItems={{ contacts: null }}
          parentId={null}
          isWithoutItems
          isInputMode />
      </FilterActiveItemAutocomplete>}
      <FilterActiveItemIcon>
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={14}
          height={14}
          color={['#8c9ea9']}
          hoverColor={['#282f34']}
          onClick={onHandleDelete} />
      </FilterActiveItemIcon>
    </FilterActiveItem>
  )
}

TasksMenuFiltersActiveItem.propTypes = {
  title: PropTypes.string,
  activeAssignee: PropTypes.string,
  delayTime: PropTypes.number,
  isMounted: PropTypes.bool,
  onDelete: PropTypes.func,
  onHandleDelete: PropTypes.func,
}

export default compose(
  withStateHandlers(
    () => ({
      delayTime: 500,
      isMounted: true,
    }),
    {
      onHandleDelete: ({ delayTime }, props) => () => {
        window.setTimeout(
          () => props.onDelete(props.title),
          delayTime
        )

        return ({ isMounted: false })
      },
    }
  ),
)(TasksMenuFiltersActiveItem)

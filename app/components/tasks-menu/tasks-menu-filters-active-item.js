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

const TasksMenuFiltersActiveItem = ({
  title,
  activeAssignee,
  isMounted,
  onHandleDeselectActiveAssignee,
  onHandleDelete,
}) => {
  const isAssignee = title === 'assignee'
  const renameTitle = filterTitle => {
    switch (filterTitle) {
      case 'assignee':
        filterTitle = 'Sent to:'
        break

      case 'today':
        filterTitle = 'Today'
        break

      case 'week':
        filterTitle = 'This week'
        break

      case 'month':
        filterTitle = 'This month'
        break

      case 'unimportant':
        filterTitle = 'Normal'
        break

      case 'noTags':
        filterTitle = 'No tags'
        break

      default:
        filterTitle = 'Important'
    }

    return filterTitle
  }

  return (
    <FilterActiveItem isMounted={isMounted}>
      {isAssignee && (
        <FilterActiveItemIcon>
          <Icon
            icon={ICONS.FOLLOWER_NEW}
            width={14}
            height={16}
            scale={0.66}
            color={['#B1B5B8']}
            onClick={onHandleDelete}
          />
        </FilterActiveItemIcon>
      )}
      <FilterActiveItemTitle isAssignee={isAssignee}>
        {renameTitle(title)}
      </FilterActiveItemTitle>
      {isAssignee && (
        <FilterActiveItemAutocomplete>
          <Autocomplete
            dataType="contacts"
            location="tasksMenuFilterContacts"
            placeholder="Select Contact"
            selectedItems={{ contacts: activeAssignee }}
            parentId={null}
            onDeselectInput={onHandleDeselectActiveAssignee}
            isWithoutItems
            isInputMode
          />
        </FilterActiveItemAutocomplete>
      )}
      <FilterActiveItemIcon>
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={14}
          height={14}
          color={['#B1B5B8']}
          hoverColor={['#293034']}
          onClick={onHandleDelete}
        />
      </FilterActiveItemIcon>
    </FilterActiveItem>
  )
}

TasksMenuFiltersActiveItem.propTypes = {
  title: PropTypes.string,
  activeAssignee: PropTypes.object,
  delayTime: PropTypes.number,
  isMounted: PropTypes.bool,
  onDeselectActiveAssignee: PropTypes.func,
  onHandleDeselectActiveAssignee: PropTypes.func,
  onDelete: PropTypes.func,
  onHandleDelete: PropTypes.func,
}

export default compose(
  withStateHandlers(
    () => ({
      delayTime: 250,
      isMounted: true,
    }),
    {
      onHandleDelete: ({ delayTime }, props) => () => {
        window.setTimeout(() => props.onDelete(props.title), delayTime)

        return { isMounted: false }
      },
      onHandleDeselectActiveAssignee: (state, props) => () => {
        props.onDeselectActiveAssignee()
        return {}
      },
    }
  )
)(TasksMenuFiltersActiveItem)

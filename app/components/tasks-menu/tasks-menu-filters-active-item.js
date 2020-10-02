import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import Autocomplete from 'components/autocomplete'

import {
  FilterActiveItem,
  FilterActiveItemIconUser,
  FilterActiveItemIconCancel,
  FilterActiveItemTitle,
  FilterActiveItemAutocomplete,
} from './styles'
import Avatar from 'react-avatar'
import { colors } from 'components/styled-components-mixins/colors'

const TasksMenuFiltersActiveItem = ({
  title,
  canAutocomplete,
  autocompleteItems,
  autocompleteLocation,
  isMounted,
  onHandleDeselectAutocomplete,
  onHandleDelete,
}) => {
  const renameTitle = filterTitle => {
    switch (filterTitle) {
      case 'assignee':
        filterTitle = 'Sent to:'
        break

      case 'sender':
        filterTitle = 'Received from:'
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

      case 'completed':
        filterTitle = 'Completed'
        break

      case 'uncompleted':
        filterTitle = 'Uncompleted'
        break

      case 'noIncoming':
        filterTitle = 'No incoming'
        break

      case 'noTags':
        filterTitle = 'No tags'
        break

      default:
        filterTitle = 'Important'
    }

    return filterTitle
  }

  const isSender = title === 'sender'
  const hasAutocompleteItems =
    autocompleteItems !== null && autocompleteItems.size > 0
  const autocompleteItem = hasAutocompleteItems
    ? autocompleteItems.first()
    : autocompleteItems

  return (
    <FilterActiveItem isMounted={isMounted}>
      <FilterActiveItemTitle canAutocomplete={canAutocomplete}>
        {renameTitle(title)}
      </FilterActiveItemTitle>
      {canAutocomplete && isSender && (
        <div>
          <Icon
            icon={ICONS.INCOMING}
            width={16}
            height={12}
            color={[
              colors.astrocopusGrey,
              colors.astrocopusGrey,
              colors.astrocopusGrey,
            ]}
          />
        </div>
      )}
      {canAutocomplete && autocompleteItem && (
        <FilterActiveItemIconUser isSender={isSender}>
          <Avatar
            src={autocompleteItem.photo}
            name={
              autocompleteItem.nickname !== null
                ? autocompleteItem.nickname
                : autocompleteItem.email
            }
            size={25}
            textSizeRatio={2}
            round
          />
        </FilterActiveItemIconUser>
      )}
      {canAutocomplete && (
        <FilterActiveItemAutocomplete isSender={isSender}>
          <Autocomplete
            dataType="contacts"
            location={autocompleteLocation}
            placeholder="Select Contact"
            selectedItems={{ contacts: autocompleteItems }}
            parentId={null}
            onDeselectInput={onHandleDeselectAutocomplete}
            isWithoutItems
            isInputMode
            canAllContacts
          />
        </FilterActiveItemAutocomplete>
      )}
      <FilterActiveItemIconCancel>
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={14}
          height={14}
          color={['#B1B5B8']}
          hoverColor={['#293034']}
          onClick={onHandleDelete}
        />
      </FilterActiveItemIconCancel>
    </FilterActiveItem>
  )
}

TasksMenuFiltersActiveItem.propTypes = {
  title: PropTypes.string,
  canAutocomplete: PropTypes.bool,
  autocompleteItems: PropTypes.object,
  autocompleteLocation: PropTypes.string,
  delayTime: PropTypes.number,
  isMounted: PropTypes.bool,
  onDeselectAutocomplete: PropTypes.func,
  onHandleDeselectAutocomplete: PropTypes.func,
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
      onHandleDeselectAutocomplete: (state, props) => () => {
        props.onDeselectAutocomplete()
        return {}
      },
    }
  )
)(TasksMenuFiltersActiveItem)

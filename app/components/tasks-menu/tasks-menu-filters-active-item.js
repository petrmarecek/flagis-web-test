import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import Autocomplete from 'components/autocomplete'

// styles
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
  onDeselectAutocomplete,
  onDelete,
}) => {
  const [isMounted, setMounted] = useState(true)

  const handleDelete = () => {
    setMounted(false)
    window.setTimeout(() => onDelete(title), 200)
  }

  const handleDeselectAutocomplete = () => {
    onDeselectAutocomplete()
  }

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
            onDeselectInput={handleDeselectAutocomplete}
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
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.aztec]}
          onClick={handleDelete}
          title="Remove filter"
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
  onDeselectAutocomplete: PropTypes.func,
  onDelete: PropTypes.func,
}

export default memo(TasksMenuFiltersActiveItem)

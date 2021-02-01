import React, { useEffect, useRef, memo } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import velocity from 'velocity-animate'
import dateUtil from 'redux/utils/date'

// components
import DatePicker from 'react-datepicker'
import { ICONS } from 'components/icons/icon-constants'

// styles
import {
  MultiSelectWrapper,
  MultiSelectItem,
} from 'components/tasks-menu/styles'
import { colors } from 'components/styled-components-mixins/colors'

const TasksMenuMultiSelect = props => {
  const multiSelectRef = useRef()

  const handleClick = event => {
    const multiSelectElem = findDOMNode(multiSelectRef.current)
    const notContainsElem = multiSelectElem
      ? !multiSelectElem.contains(event.target)
      : true

    const taskPanel =
      document.getElementsByClassName('task-list-items')[1] ||
      document.getElementsByClassName('task-list-items')[0]
    const elemTaskPanel = findDOMNode(taskPanel)
    const notContainsElemTaskPanel = elemTaskPanel
      ? !elemTaskPanel.contains(event.target)
      : true

    if (notContainsElem && notContainsElemTaskPanel) {
      props.deselectTasks()
    }
  }

  const handleKeyDown = event => {
    if (event.repeat) {
      return
    }

    switch (event.which) {
      // escape
      case 27:
        props.deselectTasks()
        return

      // delete
      case 46:
        props.onDelete()
        return

      default:
        return
    }
  }

  useEffect(() => {
    velocity(multiSelectRef.current, 'transition.fadeIn', {
      duration: 600,
      display: 'flex',
    })

    // Add listener for close menu
    document
      .getElementsByClassName('page-overflow-fix')[0]
      .addEventListener('click', handleClick, false)
    document.addEventListener('keydown', handleKeyDown, false)

    return () => {
      // Remove listener for close menu
      document
        .getElementsByClassName('page-overflow-fix')[0]
        .removeEventListener('click', handleClick, false)
      document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [])

  return (
    <MultiSelectWrapper ref={multiSelectRef}>
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.UNIMPORTANT}
          width={18}
          height={18}
          scale={1}
          title="Important"
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.aztec]}
          onClick={props.onSetSelectedTasksImportant}
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.IMPORTANT}
          width={18}
          height={18}
          scale={0.27}
          title="Unimportant"
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.aztec]}
          onClick={props.onSetSelectedTasksUnimportant}
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.TASK_UNCOMPLETED}
          width={18}
          height={18}
          scale={0.81}
          title="Complete"
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.hanumanGreen]}
          onClick={props.onSetSelectedTasksComplete}
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.TASK_COMPLETED}
          width={18}
          height={18}
          scale={0.81}
          title="Incomplete"
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.hanumanGreen]}
          onClick={props.onSetSelectedTasksIncomplete}
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <DatePicker
          todayButton="Today"
          locale="en-gb"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
          withPortal
          dropdownMode="select"
          title="Due Date"
          onChange={props.onSetSelectedTasksDueDate}
          customInput={
            <MultiSelectItem
              icon={ICONS.DUE_DATE}
              width={18}
              height={18}
              scale={1.5}
              color={[colors.astrocopusGrey]}
              hoverColor={[colors.aztec]}
            />
          }
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <DatePicker
          todayButton="Today"
          locale="en-gb"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          dateFormat={dateUtil.DEFAULT_DATE_TIME_FORMAT}
          withPortal
          dropdownMode="scroll"
          title="Reminder Date"
          onChange={props.onSetSelectedTasksReminderDate}
          customInput={
            <MultiSelectItem
              icon={ICONS.REMINDER_DATE}
              width={21}
              height={18}
              scale={1.38}
              color={[colors.astrocopusGrey]}
              hoverColor={[colors.aztec]}
            />
          }
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.ADD_REMOVE_TAG}
          width={45}
          height={17}
          scale={1}
          title="Add/Remove tags"
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.aztec]}
          onClick={props.onAddRemoveTags}
        />
      )}
      <MultiSelectItem
        icon={ICONS.TRASH}
        width={18}
        height={21}
        scale={0.8}
        title="Delete"
        color={[colors.astrocopusGrey]}
        hoverColor={[colors.pompelmo]}
        onClick={props.onDelete}
      />
    </MultiSelectWrapper>
  )
}

TasksMenuMultiSelect.propTypes = {
  auth: PropTypes.object,
  activeTags: PropTypes.object,
  isVisibleArchivedTasks: PropTypes.bool,
  onDelete: PropTypes.func,
  deselectTasks: PropTypes.func,
  onAddRemoveTags: PropTypes.func,
  onSetSelectedTasksImportant: PropTypes.func,
  onSetSelectedTasksUnimportant: PropTypes.func,
  onSetSelectedTasksComplete: PropTypes.func,
  onSetSelectedTasksIncomplete: PropTypes.func,
  onSetSelectedTasksDueDate: PropTypes.func,
  onSetSelectedTasksReminderDate: PropTypes.func,
}

export default memo(TasksMenuMultiSelect)

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

  return (
    <MultiSelectWrapper ref={multiSelectRef}>
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.IMPORTANT}
          width={22}
          height={22}
          scale={0.3}
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.aztec]}
          onClick={props.onSetImportantTasks}
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.IMPORTANT}
          width={22}
          height={22}
          scale={0.3}
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.aztec]}
          onClick={props.onSetUnimportantTasks}
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.TASK_UNCOMPLETED}
          width={22}
          height={22}
          scale={1}
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.hanumanGreen]}
          onClick={props.onSetCompleteTasks}
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.TASK_COMPLETED}
          width={22}
          height={22}
          scale={1}
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.hanumanGreen]}
          onClick={props.onSetIncompleteTasks}
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
          onChange={props.onSetSelectedTasksDueDate}
          customInput={
            <MultiSelectItem
              icon={ICONS.DUE_DATE}
              width={22}
              height={22}
              scale={1.83}
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
          onChange={props.onSetSelectedTasksReminderDate}
          customInput={
            <MultiSelectItem
              icon={ICONS.REMINDER_DATE}
              width={25}
              height={22}
              scale={1.69}
              color={[colors.astrocopusGrey]}
              hoverColor={[colors.aztec]}
            />
          }
        />
      )}
      {!props.isVisibleArchivedTasks && (
        <MultiSelectItem
          icon={ICONS.ADD_REMOVE_TAG}
          width={59}
          height={23}
          scale={1.3}
          color={[colors.astrocopusGrey]}
          hoverColor={[colors.aztec]}
          onClick={props.onAddRemoveTags}
        />
      )}
      <MultiSelectItem
        icon={ICONS.TRASH}
        width={23}
        height={26}
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
  onSetImportantTasks: PropTypes.func,
  onSetUnimportantTasks: PropTypes.func,
  onSetCompleteTasks: PropTypes.func,
  onSetIncompleteTasks: PropTypes.func,
  onSetSelectedTasksDueDate: PropTypes.func,
  onSetSelectedTasksReminderDate: PropTypes.func,
}

export default memo(TasksMenuMultiSelect)

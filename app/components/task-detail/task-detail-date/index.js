import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import TaskDetailDateInput from './task-detail-date-input'
import TaskDetailDateStatic from './task-detail-date-static'
import dateUtil from 'redux/utils/date'

const TaskDetailDate = ({ icon, isUpdatable, onUpdate, title, value }) => {
  // Convert value to moment or keep null
  const date = useMemo(() => dateUtil.toMoment(value), [value])

  // Prepare handler for clear date
  const handleClear = useCallback(() => onUpdate(null), [onUpdate])

  // Hide box when date cannot be updated and is not set yet
  if (!isUpdatable && !value) {
    return null
  }

  // Show box with static data when date cannot be updated
  if (!isUpdatable) {
    return <TaskDetailDateStatic date={date} icon={icon} title={title} />
  }

  // Otherwise show input for editing date
  return (
    <DatePicker
      customInput={<TaskDetailDateInput icon={icon} onClear={handleClear} />}
      dateFormat={[
        dateUtil.DEFAULT_DATE_TIME_FORMAT,
        dateUtil.DEFAULT_SIMPLE_DATE_SIMPLE_TIME_FORMAT,
        dateUtil.DEFAULT_SIMPLE_DATE_TIME_FORMAT,
        dateUtil.DEFAULT_SIMPLE_DATE_FORMAT,
      ]}
      dropdownMode="scroll"
      locale="en-gb"
      onChange={onUpdate}
      placeholderText="select a date"
      selected={date}
      showTimeSelect
      title={title}
      timeFormat="HH:mm"
      timeIntervals={1}
      todayButton="Today"
    />
  )
}

TaskDetailDate.defaultProps = {
  isUpdatable: true,
  value: null,
}

TaskDetailDate.propTypes = {
  icon: PropTypes.any.isRequired,
  isUpdatable: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default TaskDetailDate

import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import constants from 'utils/constants'

import { Input, Wrapper } from './styles'

const TaskDetailSubject = ({
  isCompleted,
  isArchived,
  isImportant,
  isUpdatable,
  onUpdate,
  subject,
}) => {
  // Input ref for future blur
  const inputRef = useRef(null)

  // Variable for input
  const [value, setValue] = useState(subject)

  useEffect(() => {
    setValue(subject)
  }, [subject])

  // Handler for updating input value
  const handleChange = useCallback(
    event =>
      setValue(
        event.target.value.substr(0, constants.TASKS_TITLE_MAX_CHARACTERS)
      ),
    [setValue]
  )

  // Handler for ending edit
  const handleBlur = useCallback(
    () => (_.isEmpty(value) ? setValue(subject) : onUpdate(value)),
    [subject, value]
  )

  // Handler for make blur after pressing enter
  const handleKeyDown = useCallback(
    event => (event.which === 13 ? inputRef.current.blur() : null),
    [inputRef]
  )

  return (
    <Wrapper>
      <Input
        isCompleted={isCompleted}
        isArchived={isArchived}
        isImportant={isImportant}
        isUpdatable={isUpdatable}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
      />
    </Wrapper>
  )
}

TaskDetailSubject.defaultProps = {
  isUpdatable: true,
}

TaskDetailSubject.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  isArchived: PropTypes.bool.isRequired,
  isImportant: PropTypes.bool.isRequired,
  isUpdatable: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  subject: PropTypes.string.isRequired,
}

export default TaskDetailSubject

import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import { getActivityText } from './helpers'
import { Activity, ActivityText, ActivityDate } from './styles'
import dateUtil from 'redux/utils/date'

const TaskDetailActivitiesActivity = ({ data }) => {
  const formattedDate = useMemo(
    () => dateUtil.formatDateTimeSecondary(data.createdAt),
    [data.createdAt]
  )
  const text = useMemo(() => getActivityText(data), [data])

  return (
    <Activity>
      <ActivityText>{`${text}:`}</ActivityText>
      <ActivityDate>{formattedDate}</ActivityDate>
    </Activity>
  )
}

TaskDetailActivitiesActivity.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TaskDetailActivitiesActivity

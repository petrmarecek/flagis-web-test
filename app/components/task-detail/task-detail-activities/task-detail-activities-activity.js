import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import { getActivityText } from './helpers'
import { Activity, ActivityText } from './styles'

const TaskDetailActivitiesActivity = ({ data }) => {
  const dateAgo = useMemo(() => moment(data.createdAt).fromNow(), [data.createdAt])
  const formattedDate = useMemo(
    () => moment(data.createdAt).format('DD.MM.YYYY HH:mm'),
    [data.createdAt],
  )
  const text = useMemo(() => getActivityText(data), [data])

  return (
    <Activity>
      <ActivityText title={formattedDate}>
        {`${text}: ${dateAgo}`}
      </ActivityText>
    </Activity>
  )
}

TaskDetailActivitiesActivity.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TaskDetailActivitiesActivity

import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import HeadTitle from '../../head-title'
import { titles } from '../../head-title/head-title-common'

const TaskDetailHeadTitle = ({ isArchived, isInbox, subject }) => {
  // Memoized title prefix by props
  const titlePrefix = useMemo(() => {
    if (isArchived) {
      return titles.ARCHIVE_DETAIL
    }

    if (isInbox) {
      return titles.INCOMING_DETAIL
    }

    return titles.TASK_DETAIL
  }, [isArchived, isInbox])

  // Memoized head title with prefix
  const title = useMemo(
    () => `${titlePrefix} ${subject}`,
    [subject, titlePrefix],
  )

  return <HeadTitle title={title} />
}

TaskDetailHeadTitle.defaultProps = {
  isArchived: false,
  isInbox: false,
}

TaskDetailHeadTitle.propTypes = {
  isArchived: PropTypes.bool,
  isInbox: PropTypes.bool,
  subject: PropTypes.string.isRequired,
}

export default TaskDetailHeadTitle

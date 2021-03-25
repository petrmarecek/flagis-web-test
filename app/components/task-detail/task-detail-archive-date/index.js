import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import { Wrapper, Header, HeaderTitle } from './styles'
import dateUtils from 'redux/utils/date'

const TaskDetailArchivedDate = ({ archivedAt }) => {
  if (archivedAt === null) {
    return null
  }

  // Format archived date
  const archivedDate = useMemo(
    () => dateUtils.formatDate(archivedAt, dateUtils.DEFAULT_DATE_TIME_FORMAT),
    [dateUtils.formatDate, archivedAt]
  )

  return (
    <Wrapper>
      <Header>
        <HeaderTitle>Archived at {archivedDate}</HeaderTitle>
      </Header>
    </Wrapper>
  )
}

TaskDetailArchivedDate.propTypes = {
  archivedAt: PropTypes.string,
}

export default TaskDetailArchivedDate

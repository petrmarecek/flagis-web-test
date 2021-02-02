import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import { Body, Wrapper } from './styles'
import Activity from './task-detail-activities-activity'
import AddComment from './task-detail-activities-add'
import Comment from './task-detail-activities-comment'

const TaskDetailActivities = ({ data, isCommentAddAllowed, onAddComment, onFetch }) => {
  // Start fetching task activities and comments
  useEffect(() => {
    onFetch()
  }, [onFetch])

  return (
    <Wrapper>
      {isCommentAddAllowed && <AddComment onSubmit={onAddComment} />}
      <Body>
        {data.map(item => item.type
          ? <Activity data={item} />
          : <Comment data={item} />)}
      </Body>
    </Wrapper>
  )
}

TaskDetailActivities.defaultProps = {
  isFetching: false,
  isCommentAddAllowed: true,
}

TaskDetailActivities.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  isCommentAddAllowed: PropTypes.bool,
  onAddComment: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
}

export default TaskDetailActivities

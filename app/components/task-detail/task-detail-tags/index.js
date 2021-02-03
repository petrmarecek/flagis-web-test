import PropTypes from 'prop-types'
import React from 'react'
import TagMultiEmptyIcon from 'components/icons/tag-multi-empty-icon'

import Autocomplete from '../../autocomplete'
import TagItems from '../../common/tag-items'
import {
  Body,
  Header,
  HeaderLeft,
  HeaderLock,
  HeaderLockIcon,
  HeaderTitle,
  Wrapper,
} from './styles'

const TaskDetailTags = ({ isUpdatable, onDelete, tags, taskId }) => {
  return (
    <Wrapper>
      <Header>
        <HeaderLeft>
          <TagMultiEmptyIcon />
        </HeaderLeft>
        <HeaderTitle>Tags</HeaderTitle>
        {!isUpdatable && (
          <HeaderLock>
            <HeaderLockIcon />
          </HeaderLock>
        )}
      </Header>
      <Body>
        {isUpdatable && (
          <Autocomplete
            dataType="tags"
            location="taskDetailTags"
            parentId={taskId}
            placeholder="Add tags"
            selectedItems={{ tags }}
            onItemDelete={onDelete}
            isAllowUpdate
          />
        )}
        {!isUpdatable && <TagItems tags={tags} />}
      </Body>
    </Wrapper>
  )
}

TaskDetailTags.defaultProps = {
  isUpdatable: true,
}

TaskDetailTags.propTypes = {
  isUpdatable: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  taskId: PropTypes.string.isRequired,
}

export default TaskDetailTags

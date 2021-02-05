import { List } from 'immutable'
import PropTypes from 'prop-types'
import React from 'react'

import { Header, HeaderAutocomplete, HeaderLeft, Wrapper } from './styles'
import AvatarDefaultIcon from 'components/icons/avatar-default-icon'

const TaskDetailFollowerToAdd = ({ followers, taskId }) => (
  <Wrapper>
    <Header>
      <HeaderLeft>
        <AvatarDefaultIcon />
      </HeaderLeft>
      <HeaderAutocomplete
        dataType="contacts"
        location="taskDetailContacts"
        placeholder="To: Add contact"
        selectedItems={{ contacts: List(followers.map(item => item.profile)) }}
        parentId={taskId}
      />
    </Header>
  </Wrapper>
)

TaskDetailFollowerToAdd.propTypes = {
  followers: PropTypes.array.isRequired,
  taskId: PropTypes.string.isRequired,
}

export default TaskDetailFollowerToAdd

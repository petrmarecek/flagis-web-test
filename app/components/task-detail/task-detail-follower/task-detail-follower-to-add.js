import { List } from 'immutable'
import PropTypes from 'prop-types'
import React from 'react'

import { Header, HeaderAutocomplete, HeaderIcon, HeaderLeft, Wrapper } from './styles'

const TaskDetailFollowerToAdd = ({ followers, taskId }) => (
  <Wrapper>
    <Header>
      <HeaderLeft>
        <HeaderIcon />
      </HeaderLeft>
      <HeaderAutocomplete
        dataType='contacts'
        location='taskDetailContacts'
        placeholder='To: Add contact'
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

import PropTypes from 'prop-types'
import React from 'react'

import { Header, HeaderIcon, HeaderLeft, HeaderTitle, Wrapper } from './styles'

const TaskDetailRemove = ({ isUpdatable, onClick }) => {
  if (!isUpdatable) {
    return null
  }

  return (
    <Wrapper onClick={onClick}>
      <Header>
        <HeaderLeft>
          <HeaderIcon />
        </HeaderLeft>
        <HeaderTitle>Delete</HeaderTitle>
      </Header>
    </Wrapper>
  )
}

TaskDetailRemove.defaultProps = {
  isUpdatable: true,
}

TaskDetailRemove.propTypes = {
  isUpdatable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default TaskDetailRemove

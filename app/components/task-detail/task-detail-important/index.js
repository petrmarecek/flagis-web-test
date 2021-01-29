import PropTypes from 'prop-types'
import React from 'react'

import {
  Header,
  HeaderIcon,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  Switch,
  Wrapper,
} from './styles'

const TaskDetailImportant = ({ isImportant, isUpdatable, onClick }) => {
  if (!isUpdatable) {
    return null
  }

  return (
    <Wrapper onClick={onClick}>
      <Header>
        <HeaderLeft>
          <HeaderIcon />
        </HeaderLeft>
        <HeaderTitle>Important</HeaderTitle>
        <HeaderRight>
          <Switch isChecked={isImportant} />
        </HeaderRight>
      </Header>
    </Wrapper>
  )
}

TaskDetailImportant.defaultProps = {
  isUpdatable: true,
}

TaskDetailImportant.propTypes = {
  isImportant: PropTypes.bool.isRequired,
  isUpdatable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default TaskDetailImportant

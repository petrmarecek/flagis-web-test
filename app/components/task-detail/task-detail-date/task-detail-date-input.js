import PropTypes from 'prop-types'
import React from 'react'

import {
  Body,
  BodyClear,
  BodyClearIcon,
  BodyText,
  Header,
  HeaderIcon,
  HeaderLeft,
  HeaderTitle,
  Wrapper,
} from './styles'

const TaskDetailDateInput = ({ icon, onClear, onClick, title, value }) => (
  <Wrapper cursor="pointer" onClick={onClick}>
    <Header>
      <HeaderLeft>
        <HeaderIcon icon={icon} />
      </HeaderLeft>
      <HeaderTitle>{title}</HeaderTitle>
    </Header>
    {Boolean(value) && (
      <Body>
        <BodyText>{value}</BodyText>
        <BodyClear onClick={onClear}>
          <BodyClearIcon />
        </BodyClear>
      </Body>
    )}
  </Wrapper>
)

TaskDetailDateInput.defaultProps = {
  value: null,
}

TaskDetailDateInput.propTypes = {
  icon: PropTypes.any.isRequired,
  onClear: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default TaskDetailDateInput

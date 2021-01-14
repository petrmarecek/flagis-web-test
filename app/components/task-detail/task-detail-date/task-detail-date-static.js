import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import dateUtils from '../../../redux/utils/date'

import {
  Body, BodyText,
  Header, HeaderIcon, HeaderLeft, HeaderLock, HeaderLockIcon, HeaderTitle,
  Wrapper,
} from './styles'

const TaskDetailDateStatic = ({ date, icon, title }) => {
  const formattedDate = useMemo(
    () => !date || dateUtils.formatDate(date, dateUtils.DEFAULT_DATE_TIME_FORMAT),
    [date],
  )

  return (
    <Wrapper>
      <Header>
        <HeaderLeft>
          <HeaderIcon icon={icon} />
        </HeaderLeft>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderLock>
          <HeaderLockIcon />
        </HeaderLock>
      </Header>
      <Body>
        <BodyText isDisabled>{formattedDate}</BodyText>
      </Body>
    </Wrapper>
  )
}

TaskDetailDateStatic.propTypes = {
  date: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
}

export default TaskDetailDateStatic

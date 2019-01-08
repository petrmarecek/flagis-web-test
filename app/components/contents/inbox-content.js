import React from 'react'
import TaskListContainer from '../task-list'

import styled from 'styled-components'

const Container = styled.div`
  margin-top: 10px;
  clear: both;
`

const InboxContent = () => (
  <Container>
    <TaskListContainer />
  </Container>
)

export default InboxContent

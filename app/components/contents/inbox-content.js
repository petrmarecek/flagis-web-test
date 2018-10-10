import React from 'react'
import InboxList from '../inbox-list'

import styled from 'styled-components'

const Container = styled.div`
  margin: 10px;
  clear: both;
`;

const InboxContent = () => (
  <Container>
    <InboxList/>
  </Container>
)

export default InboxContent

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

import { getUserEmail } from 'redux/store/auth/auth.selectors'

import styled from 'styled-components'
import {textOverflow} from "../styled-components-mixins";

const Container = styled.div`
  position: fixed;
  bottom: 32px;
  left: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Email = styled.div`
  font-size: 15px;
  color: #8C9DA9;
  margin: 0 0 0 10px;
  max-width: 204px;
  overflow: hidden;
  white-space: nowrap;
  ${textOverflow('ellipsis')}
`;

const LoggedAccount = ({ email }) => (
  <Container>
    <Icon
      icon={ICONS.CONTACT_EXIST}
      width={24}
      height={24}
      scale={1.14}
      color={['#8C9DA9', '#fff']}/>
  <Email title={email}>{email}</Email>
  </Container>
)

LoggedAccount.propTypes = {
  email: PropTypes.string,
}

const mapStateToProps = state => ({
  email: getUserEmail(state)
})

export default connect(mapStateToProps)(LoggedAccount)

import React from 'react'
import Loader from 'components/elements/loader'
import Icon from 'components/icons/icon'
import {ICONS} from 'components/icons/icon-constants'
import styled from 'styled-components'

const MainLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  pointer-events: none;
`;

const Logo = styled.div`
  svg {    
    path {
      fill: #282f34;
      &:last-of-type {
        fill: #00FFC7;
      }
    }
  }
`;

const MainLoader = () => (
  <MainLoaderContainer>
    <Logo>
      <Icon
        icon={ICONS.LOGO}
        color={['#282f34']}
        width={65}
        height={32} />
    </Logo>
    <Loader/>
  </MainLoaderContainer>
)

export default MainLoader

import React from 'react'
import Loader from 'components/common/loader'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'
import styled from 'styled-components'

const MainLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  pointer-events: none;
`

const MainLoader = () => (
  <MainLoaderContainer>
    <Icon icon={ICONS.LOGO} color={['#293034']} width={67} height={24} />
    <Loader />
  </MainLoaderContainer>
)

export default MainLoader

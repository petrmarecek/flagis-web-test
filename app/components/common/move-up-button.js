import React from 'react'

// components
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

// styles
import styled from 'styled-components'
import { colors } from 'components/styled-components-mixins/colors'
import { fontMain, transform } from 'components/styled-components-mixins'

const MoveUpButtonWrapper = styled.div`
  ${fontMain}
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`

const MoveUpButtonInner = styled.div`
  display: flex;
  align-items: center;
  :hover {
    svg {
      ${transform('rotate(180deg) translate(0, 2px)')}
    }
  }
`

const TextWrapper = styled.div`
  margin-right: 5px;
`

const IconWrapper = styled(Icon)`
  ${transform('rotate(180deg)')}
  cursor: pointer;
`

const MoveUpButton = () => {
  const onHandleMoveUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <MoveUpButtonWrapper onClick={onHandleMoveUp}>
      <MoveUpButtonInner>
        <TextWrapper>Move Up</TextWrapper>
        <IconWrapper
          icon={ICONS.ARROW_DOUBLE_DOWN}
          width={10}
          height={12}
          scale={0.85}
          color={[colors.darkJungleGreen]}
          onClick={onHandleMoveUp}
        />
      </MoveUpButtonInner>
    </MoveUpButtonWrapper>
  )
}

export default MoveUpButton

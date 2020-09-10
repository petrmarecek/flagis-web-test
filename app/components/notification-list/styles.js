import styled, { keyframes } from 'styled-components'
import {
  borderRadius,
  fontMain,
  textOverflow,
} from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'
import { fadeInUp } from 'react-animations'

/*--------------------------------- Animations -----------------------------------*/
const fadeUp = keyframes`${fadeInUp}`

/*--------------------------------- Notification Item ----------------------------*/
const ItemWrapper = styled.li`
  ${borderRadius('3px')};
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  list-style-type: none;
  margin: 0 0 4px;
  cursor: pointer;
  position: relative;
  background-color: ${props =>
    props.isRead ? colors.whitePorcelain : colors.white};
  height: 70px;
  animation: 400ms ${fadeUp};
  padding: 6px 15px 6px 30px;
  ${fontMain}
`

const Indicator = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  ::before {
    content: '';
    height: 8px;
    width: 8px;
    background-color: ${colors.hanumanGreen};
    ${borderRadius('50%')}
  }
`

const ItemContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  ${textOverflow('ellipsis')}
`

const MainTitle = styled.div`
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  line-height: 16px;
  ${textOverflow('ellipsis')}

  span {
    margin-left: 6px;
    font-weight: normal;
  }
`

const SecondTitle = styled.div`
  color: ${colors.astrocopusGrey};
  font-size: 14px;
  line-height: 16px;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 4px;
  ${textOverflow('ellipsis')}
`

const Date = styled.div`
  position: absolute;
  top: 4px;
  right: 15px;
  color: ${colors.greyOfDarkness};
  font-size: 12px;
  line-height: 14px;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  padding-top: 6px;
  margin-left: 6px;

  img {
    object-fit: cover;
  }

  svg {
    margin: 0 5px 0 0;
  }
`

export {
  ItemWrapper,
  Indicator,
  ItemContentWrapper,
  MainTitle,
  SecondTitle,
  Date,
  Icons,
}

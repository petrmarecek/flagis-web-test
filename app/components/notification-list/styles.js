import styled, { keyframes } from 'styled-components'
import {
  borderRadius,
  fontMain,
  textOverflow,
} from 'components/styled-components-mixins'
import { fadeInUp } from 'react-animations'

/*--------------------------------- Animations -----------------------------------*/
const fadeUp = keyframes`${fadeInUp}`

/*--------------------------------- Notification Item ----------------------------*/
const ItemWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  list-style-type: none;
  margin: 0 0 4px;
  cursor: pointer;
  position: relative;
  background-color: white;
  height: 70px;
  animation: 400ms ${fadeUp};
  padding: 0 15px 0 25px;
  ${fontMain}
  font-size: 14px;
`

const Indicator = styled.div`
  position: absolute;
  left: 8px;
  top: 31px;
  height: 8px;
  width: 8px;
  background-color: #44ffb1;
  ${borderRadius('50%')}
`

const User = styled.div`
  position: absolute;
  left: 25px;
  top: 6px;
  color: #b1b5b8;
  font-size: 12px;
`

const Date = styled.div`
  position: absolute;
  right: 15px;
  top: 6px;
  color: #b1b5b8;
  font-size: 12px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-weight: ${props => (props.isRead ? 'normal' : 'bold')};
  overflow: hidden;
  white-space: nowrap;
  ${textOverflow('ellipsis')}
`

const Icons = styled.div`
  svg {
    margin: 0 0 0 5px;
  }
`

export { ItemWrapper, Indicator, User, Date, Content, Title, Icons }

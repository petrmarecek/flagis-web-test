import styled, { keyframes } from 'styled-components'
import { fadeInUp } from 'react-animations'
import { textOverflow, borderRadius } from '../styled-components-mixins'
import Icon from '../icons/icon'

const fadeUp = keyframes`${fadeInUp}`

const ContactItemContainer = styled.li`
  ${borderRadius('3px')};
  overflow: hidden;
  list-style-type: none;
  margin: 0 0 4px;
  cursor: pointer;
  position: relative;
  background-color: ${props => props.theme.contactItem.wrapperBgColor};
  height: 30px;
  animation: 400ms ${fadeUp};
`

const ContactItemIcon = styled.div`
  position: absolute;
  left: 15px;
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`

const ContactItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 103px 0 45px;
`

const ContactItemTitle = styled.div`
  min-width: 0;
  height: 18px;
  ${textOverflow('ellipsis')}
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  color: ${props => props.theme.contactItem.subjectTextColor};
`

const ContactItemInvite = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
  color: #b1b5b8;
  overflow: hidden;
  z-index: 1;

  :hover {
    color: #293034;

    svg {
      path {
        fill: #293034;
      }
    }
  }
`

const ContactItemInviteIcon = styled(Icon)`
  margin: 0 10px 0 20px;
`

const ContactItemInviteText = styled.div`
  margin-right: 20px;
  font-size: 14px;
  font-weight: bold;
`

export {
  ContactItemContainer,
  ContactItemIcon,
  ContactItemTitleWrapper,
  ContactItemTitle,
  ContactItemInvite,
  ContactItemInviteIcon,
  ContactItemInviteText,
}

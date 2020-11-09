import styled from 'styled-components'
import * as commonStyles from '../common/styles'

// TODO: Change color literals to constants

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 548px;
  min-height: 512px;

  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 11px rgba(28, 33, 36, 0.4);
`

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  padding: 25px;
`

const Description = styled.p`
  margin-bottom: 16px;

  font-family: 'Roboto', sans-serif;
  font-style: normal:
  font-weight: normal:
  font-size: 14px;
  line-height: 16px;

  color: #1C2124;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FooterButton = styled.a.attrs(({ bold }) => ({
  color: bold ? '#1C2124' : '#979797',
  fontWeight: bold ? 'bold' : 'normal',
}))`
  margin: 0 20px 0 5px;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: ${props => props.fontWeight};
  font-size: 16px;
  line-height: 19px;

  color: ${props => props.color};
  cursor: pointer;
`

const FooterIcon = styled.img``

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
`

const FooterRight = styled.div`
  display: flex;
  align-items: center;
`

const FooterStatus = styled.span`
  margin: 0 0 0 11px;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 19px;

  color: #1C2124;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const Inner = styled.div``

const Title = styled.span`
  display: block;

  margin: 4px 0 13px;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;

  color: #1C2124;
`

const Wrapper = styled(commonStyles.Wrapper)``

export {
  Box,
  Content,
  Description,
  Footer,
  FooterButton,
  FooterIcon,
  FooterLeft,
  FooterRight,
  FooterStatus,
  Image,
  Inner,
  Title,
  Wrapper,
}

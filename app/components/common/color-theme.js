import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { toggleColorTheme } from 'redux/store/auth/auth.actions'
import { getColorTheme } from 'redux/store/auth/auth.selectors'

// images
import ColorThemeStandard from 'assets/img/color-theme/color-theme-standard.png'
import ColorThemeLight from 'assets/img/color-theme/color-theme-light.png'
import ColorThemeDark from 'assets/img/color-theme/color-theme-dark.png'

// styles
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 36px 0 0 40px;
`

const Title = styled.div`
  color: ${props => props.theme.colorTheme.title};
  font-size: 14px;
  margin-bottom: 15px;
`

const WrapperItems = styled.div`
  display: flex;
`
const Item = styled.div`
  position: relative;
  padding: 10px;
  margin: 0 5px 0 0;
  border: ${props => (props.active ? '1px solid #efefef' : '1px solid #fff')};
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};

  :hover {
    border: ${props =>
  props.disabled ? '1px solid #fff' : '1px solid #efefef'};
  }
`

const ItemImage = styled.div`
  margin-bottom: 25px;
`

const ItemText = styled.div`
  color: ${props => props.theme.colorTheme.itemText};
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
`

const CommingSoon = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  color: #fff;
  font-size: 14px;
  white-space: normal;
  width: 100px;
  text-align: center;
`

const ColorTheme = ({ colorTheme, onHandleToggleColorTheme }) => (
  <Wrapper>
    <Title>Choose your color theme</Title>
    <WrapperItems>
      <Item
        onClick={() => onHandleToggleColorTheme('standard')}
        active={colorTheme === 'standard'}
      >
        <ItemImage>
          <img src={ColorThemeStandard} width="154" height="89" />
        </ItemImage>
        <ItemText>Standard</ItemText>
      </Item>
      <Item
        onClick={() => onHandleToggleColorTheme('light')}
        active={colorTheme === 'light'}
      >
        <ItemImage>
          <img src={ColorThemeLight} width="154" height="89" />
        </ItemImage>
        <ItemText>Light</ItemText>
      </Item>
      <Item
        onClick={() => onHandleToggleColorTheme('dark')}
        active={colorTheme === 'dark'}
      >
        <ItemImage>
          <img src={ColorThemeDark} width="154" height="89" />
        </ItemImage>
        <ItemText>Dark</ItemText>
        <CommingSoon>Experimental</CommingSoon>
      </Item>
    </WrapperItems>
  </Wrapper>
)

ColorTheme.propTypes = {
  colorTheme: PropTypes.string,
  onHandleToggleColorTheme: PropTypes.func,
}

const mapStateToProps = state => ({
  colorTheme: getColorTheme(state),
})

const mapDispatchToProps = { toggleColorTheme }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    onHandleToggleColorTheme: props => theme => props.toggleColorTheme(theme),
  }),
)(ColorTheme)

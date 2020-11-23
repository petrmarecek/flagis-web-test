import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { ToastContainer } from 'react-toastify'

// style
import 'react-toastify/dist/ReactToastify.css'
import { borderRadius, fontBold } from '../styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

// redux
import { connect } from 'react-redux'
import { getColorTheme } from '../../redux/store/auth/auth.selectors'

const circle = css`
  ${borderRadius('6px')}
  content: '';
  display: inline-block;
  width: 12px;
  min-width: 12px;
  height: 12px;
  min-height: 12px;
  margin: auto 20px;
`

const ToastNotificationsWrapper = styled.div`
  .Toastify__toast-container {
    width: 360px;
  }
  .Toastify__toast {
    ${fontBold}
    ${borderRadius('5px')}
    padding: 10px 10px 10px 0;
    color: ${props => props.theme.toastNotificationText};
    background: ${props =>
  props.theme.toastNotificationBackground};
    font-size: 14px;
    min-height: 80px;
  }
  .Toastify__toast--error {
    .Toastify__toast-body::before {
      ${circle}
      background: ${colors.pompelmo};
    }
  }
  .Toastify__toast--info {
    .Toastify__toast-body::before {
      ${circle}
      background: ${colors.pervenche};
    }
  }
  .Toastify__toast--success {
    .Toastify__toast-body::before {
      ${circle}
      background: ${colors.hanumanGreen};
    }
  }
  .Toastify__toast-body {
      display: flex;
      align-items: center;
      line-height: 18px;
    }
  .Toastify__close-button {
    margin-left: 10px;
    color: ${colors.coldWind};
  }
  .Toastify__progress-bar {
    ${borderRadius('5px')}
    bottom: 4px;
    right: 10px;
    left: 52px;
    width: auto;
    height: 2px;
    font-weight: normal;
    background-color: ${colors.coldWind};
  }
`

export const ToastNotificationsContainer = ({ colorTheme, ...props }) => (
  <ToastNotificationsWrapper colorTheme={colorTheme}>
    <ToastContainer {...props} />
  </ToastNotificationsWrapper>
)

ToastNotificationsContainer.propTypes = {
  colorTheme: PropTypes.string,
}

const mapStateToProps = state => ({
  colorTheme: getColorTheme(state),
})

export default connect(mapStateToProps)(ToastNotificationsContainer)

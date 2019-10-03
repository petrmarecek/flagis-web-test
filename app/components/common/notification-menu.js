import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import {
  visibleReadNotifications,
  hideReadNotifications,
  readAllNotifications,
} from 'redux/store/notifications/notifications.actions'
import { getReadNotificationsVisibility } from 'redux/store/notifications/notifications.selectros'

// styles
import styled from 'styled-components'
import { fontMain } from 'components/styled-components-mixins'

const Wrapper = styled.div`
  ${fontMain}
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Right = styled.div`
  display: flex;
`
const Left = styled.div`
  display: flex;
`

const Button = styled.div`
  font-size: 14px;
  color: #b1b5b8;
  height: 100%;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  margin: ${props => (props.isMargin ? '0 20px 0 0' : '0')};

  :hover {
    font-weight: bold;
  }
`

const NotificationMenu = ({
  isReadVisible,
  onHandleClickAll,
  onHandleClickActive,
  onHandleClickReadAll,
}) => (
  <Wrapper>
    <Right>
      <Button onClick={onHandleClickAll} isMargin isActive={isReadVisible}>
        All
      </Button>
      <Button onClick={onHandleClickActive} isActive={!isReadVisible}>
        Active
      </Button>
    </Right>
    <Left>
      {/* <Button onClick={onHandleClickSettings} isMargin>
        Notifications Settings
      </Button> */}
      <Button onClick={onHandleClickReadAll}>Read All</Button>
    </Left>
  </Wrapper>
)

NotificationMenu.propTypes = {
  isReadVisible: PropTypes.bool,
  onHandleClickAll: PropTypes.func,
  onHandleClickActive: PropTypes.func,
  onHandleClickSettings: PropTypes.func,
  onHandleClickReadAll: PropTypes.func,
}

const mapStateToProps = state => ({
  isReadVisible: getReadNotificationsVisibility(state),
})

const mapDispatchToProps = {
  visibleReadNotifications,
  hideReadNotifications,
  readAllNotifications,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onHandleClickAll: props => () => props.visibleReadNotifications(),
    onHandleClickActive: props => () => props.hideReadNotifications(),
    onHandleClickSettings: () => () => {
      // TODO: redirect to notifications settings
    },
    onHandleClickReadAll: props => () => props.readAllNotifications(),
  })
)(NotificationMenu)

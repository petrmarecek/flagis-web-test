import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import { hideArchivedTasks, changeLocation } from 'redux/store/app-state/app-state.actions'
import { deselectTasks, setTimeLine, cancelTimeLine } from 'redux/store/tasks/tasks.actions'
import { deselectTags } from 'redux/store/tags/tags.actions'
import { deselectContacts } from 'redux/store/contacts/contacts.actions'
import { getTimeLine } from 'redux/store/tasks/tasks.selectors'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

import { NavigationContainer, Button } from './styles'

const TasksMenuNavigation = props => {

  const {
    pathname,
    timeLine,
    onHandleClickTasks,
    onHandleClickTimeLine,
    onHandleClickDashboard,
  } = props

  const isTaskActive = (pathname === '/user/tasks' && !timeLine)
  const isTimeLineActive = (pathname === '/user/tasks' && timeLine)
  const isDashboardActive = pathname === '/user/dashboard'
  const color = '#8C9DA9'
  const colorActive = '#fff'

  return (
    <NavigationContainer>
      <Button
        active={isTaskActive}
        onClick={onHandleClickTasks}
        radius='3px 0 0 3px'
        first >
        <Icon
          icon={ICONS.TASKS}
          width={19}
          height={15}
          scale={0.75}
          color={isTaskActive ? [colorActive] : [color]} />
      </Button>
      <Button
        active={isTimeLineActive}
        onClick={onHandleClickTimeLine}>
        <Icon
          icon={ICONS.TIME_LINE}
          width={18}
          height={15}
          scale={0.6}
          color={isTimeLineActive ? [colorActive] : [color]} />
      </Button>
      <Button
        active={isDashboardActive}
        onClick={onHandleClickDashboard}
        radius='0 3px 3px 0' >
        <Icon
          icon={ICONS.DASHBOARD}
          width={15}
          height={15}
          scale={1.36}
          color={isDashboardActive ? [colorActive] : [color]} />
      </Button>
    </NavigationContainer>
  )
}

TasksMenuNavigation.propTypes = {
  pathname: PropTypes.string,
  timeLine: PropTypes.bool,
  onHandleClickTasks: PropTypes.func,
  onHandleClickTimeLine: PropTypes.func,
  onHandleClickDashboard: PropTypes.func,
}

const mapStateToProps = (state) => ({
  pathname: getRoutingPathname(state),
  timeLine: getTimeLine(state)
})

const mapDispatchToProps = {
  deselectTasks,
  setTimeLine,
  cancelTimeLine,
  deselectTags,
  deselectContacts,
  hideArchivedTasks,
  changeLocation
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleClickTasks: props => () => {
      props.cancelTimeLine()
      props.hideArchivedTasks()
      props.deselectTasks()
      props.deselectTags()
      props.deselectContacts()
      props.changeLocation('/user/tasks')
    },
    onHandleClickTimeLine: props => () => {
      props.hideArchivedTasks()
      props.deselectTasks()
      props.deselectTags()
      props.deselectContacts()
      props.setTimeLine()
      props.changeLocation('/user/tasks')
    },
    onHandleClickDashboard: props => () => {
      props.cancelTimeLine()
      props.hideArchivedTasks()
      props.deselectTasks()
      props.deselectTags()
      props.deselectContacts()
      props.changeLocation('/user/dashboard')
    },
  })
)(TasksMenuNavigation)

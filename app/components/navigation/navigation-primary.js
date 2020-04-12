import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeNavigation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import {
  getPrimaryHiddenNavigationVisibility,
  getPrimaryHiddenNavigationAnimation,
} from 'redux/store/app-state/app-state.selectors'
import { getColorTheme } from 'redux/store/auth/auth.selectors'
import { getInboxTasksItems } from 'redux/store/tasks/tasks.selectors'
import {
  primaryHiddenNavigationVisible,
  primaryHiddenNavigationHide,
  setPrimaryHiddenNavigationAnimation,
  deselectPrimaryHiddenNavigationAnimation,
} from 'redux/store/app-state/app-state.actions'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
import {
  TriangleIcon,
  NavigationPrimaryWrapper,
  NavigationPrimaryHidden,
  PrimaryButton,
  PrimaryButtonText,
  InboxCounter,
  ShowMoreButton,
  ShowMoreTitle,
} from './styles'
import colors from 'components/styled-components-mixins/colors'

const NavigationButtonWithIcon = ({
  active,
  onClick,
  colorTheme,
  icon,
  iconWidth,
  iconHeight,
  iconScale,
  label,
  children
}) => (
  <PrimaryButton
    active={active}
    onClick={onClick}
    colorTheme={colorTheme}
  >
    <Icon
      icon={icon}
      width={iconWidth}
      height={iconHeight}
      scale={iconScale}
      color={
        active
          ? [colors[colorTheme].navigationPrimaryHover]
          : [colors[colorTheme].navigationPrimary]
      }
    />
    <PrimaryButtonText>{label}</PrimaryButtonText>
    {children}
  </PrimaryButton>
)

NavigationButtonWithIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  colorTheme: PropTypes.string,
  icon: PropTypes.object.isRequired,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  iconScale: PropTypes.number,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
}

const NavigationPrimary = props => {
  const {
    inboxCount,
    pathname,
    colorTheme,
    isVisibleMore,
    isAnimationMore,
    onHandleClickDashboard,
    onHandleClickMore,
    onHandleClickTasks,
    onHandleClickTags,
    onHandleClickInbox,
    onHandleClickArchive,
    onHandleClickContacts,
  } = props

  const { user } = routes
  const isDashboardActive = pathname.substring(0, user.dashboard.length) === user.dashboard
  const isTasksActive = pathname.substring(0, user.tasks.length) === user.tasks
  const isTagsActive = pathname.substring(0, user.tags.length) === user.tags
  const isInboxActive = pathname.substring(0, user.inbox.length) === user.inbox
  const isArchiveActive =
    pathname.substring(0, user.archive.length) === user.archive
  const isContactsActive =
    pathname.substring(0, user.contacts.length) === user.contacts

  return (
    <NavigationPrimaryWrapper isVisibleMore={isVisibleMore}>
      <NavigationButtonWithIcon
        active={isDashboardActive}
        onClick={onHandleClickDashboard}
        colorTheme={colorTheme}
        icon={ICONS.TASK_UNCOMPLETED}
        iconWidth={18}
        iconHeight={18}
        iconScale={0.81}
        label={"Dashboard"} />
      <NavigationButtonWithIcon
        active={isTasksActive}
        onClick={onHandleClickTasks}
        colorTheme={colorTheme}
        icon={ICONS.TASK_UNCOMPLETED}
        iconWidth={18}
        iconHeight={18}
        iconScale={0.81}
        label={"My Tasks"} />
      <NavigationButtonWithIcon
        active={isTagsActive}
        onClick={onHandleClickTags}
        colorTheme={colorTheme}
        icon={ICONS.TAG_MULTI}
        iconWidth={18}
        iconHeight={11}
        iconScale={0.9}
        label={"Tags"} />
      <NavigationButtonWithIcon
        active={isInboxActive}
        onClick={onHandleClickInbox}
        colorTheme={colorTheme}
        icon={ICONS.INBOX}
        iconWidth={18}
        iconHeight={13}
        iconScale={0.58}
        label={"Inbox"}
      >
        {inboxCount > 0 && <InboxCounter count={inboxCount} />}
      </NavigationButtonWithIcon>

      {isAnimationMore && (
        <NavigationPrimaryHidden>
          <NavigationButtonWithIcon
            active={isArchiveActive}
            onClick={onHandleClickArchive}
            colorTheme={colorTheme}
            icon={ICONS.ARCHIVED}
            iconWidth={18}
            iconHeight={16}
            iconScale={1.05}
            label={"Archived Tasks"} />
          <NavigationButtonWithIcon
            active={isContactsActive}
            onClick={onHandleClickContacts}
            colorTheme={colorTheme}
            icon={ICONS.CONTACTS}
            iconWidth={18}
            iconHeight={14}
            iconScale={0.6}
            label={"Contacts"} />
        </NavigationPrimaryHidden>
      )}
      <ShowMoreButton
        onClick={onHandleClickMore}
        isVisibleMore={isVisibleMore}
        colorTheme={colorTheme}
      >
        <ShowMoreTitle>
          {isVisibleMore ? 'Show less' : 'Show more'}
        </ShowMoreTitle>
        <TriangleIcon
          icon={ICONS.TRIANGLE}
          width={11}
          height={5}
          color={[colors[colorTheme].navigationPrimaryShowMore]}
        />
      </ShowMoreButton>
    </NavigationPrimaryWrapper>
  )
}

NavigationPrimary.propTypes = {
  inboxCount: PropTypes.number,
  pathname: PropTypes.string,
  colorTheme: PropTypes.string,
  isVisibleMore: PropTypes.bool,
  isAnimationMore: PropTypes.bool,
  onHandleClickMore: PropTypes.func,
  onHandleClickTasks: PropTypes.func,
  onHandleClickTimeLine: PropTypes.func,
  onHandleClickTags: PropTypes.func,
  onHandleClickInbox: PropTypes.func,
  onHandleClickArchive: PropTypes.func,
  onHandleClickContacts: PropTypes.func,
  onHandleClickDashboard: PropTypes.func,
}

const mapStateToProps = state => ({
  inboxCount: getInboxTasksItems(state).size,
  pathname: getRoutingPathname(state),
  colorTheme: getColorTheme(state),
  isVisibleMore: getPrimaryHiddenNavigationVisibility(state),
  isAnimationMore: getPrimaryHiddenNavigationAnimation(state),
})

const mapDispatchToProps = {
  changeNavigation,
  primaryHiddenNavigationVisible,
  primaryHiddenNavigationHide,
  setPrimaryHiddenNavigationAnimation,
  deselectPrimaryHiddenNavigationAnimation,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleClickMore: props => () => {
      if (props.isVisibleMore) {
        props.primaryHiddenNavigationHide()
        props.deselectPrimaryHiddenNavigationAnimation()
        return
      }

      props.primaryHiddenNavigationVisible()
      window.setTimeout(() => props.setPrimaryHiddenNavigationAnimation(), 350)
    },
    onHandleClickDashboard: props => () =>
      props.changeNavigation(routes.user.dashboard),
    onHandleClickTasks: props => () =>
      props.changeNavigation(routes.user.tasks),
    onHandleClickTags: props => () => props.changeNavigation(routes.user.tags),
    onHandleClickInbox: props => () =>
      props.changeNavigation(routes.user.inbox, 'inbox'),
    onHandleClickArchive: props => () =>
      props.changeNavigation(routes.user.archive, 'archived'),
    onHandleClickContacts: props => () =>
      props.changeNavigation(routes.user.contacts),
  })
)(NavigationPrimary)

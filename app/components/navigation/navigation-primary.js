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

const NavigationPrimary = props => {
  const {
    inboxCount,
    pathname,
    colorTheme,
    isVisibleMore,
    isAnimationMore,
    onHandleClickMore,
    onHandleClickTasks,
    onHandleClickTags,
    onHandleClickInbox,
    onHandleClickArchive,
    onHandleClickContacts,
  } = props

  const { user } = routes
  const isTasksActive = pathname.substring(0, user.tasks.length) === user.tasks
  const isTagsActive = pathname.substring(0, user.tags.length) === user.tags
  const isInboxActive = pathname.substring(0, user.inbox.length) === user.inbox
  const isArchiveActive =
    pathname.substring(0, user.archive.length) === user.archive
  const isContactsActive =
    pathname.substring(0, user.contacts.length) === user.contacts

  return (
    <NavigationPrimaryWrapper isVisibleMore={isVisibleMore}>
      <PrimaryButton
        active={isTasksActive}
        onClick={onHandleClickTasks}
        colorTheme={colorTheme}
      >
        <Icon
          icon={ICONS.TASK_CHECKED}
          width={18}
          height={18}
          scale={0.81}
          color={
            isTasksActive
              ? [colors[colorTheme].navigationPrimaryHover]
              : [colors[colorTheme].navigationPrimary]
          }
        />
        <PrimaryButtonText>My Tasks</PrimaryButtonText>
      </PrimaryButton>
      <PrimaryButton
        active={isTagsActive}
        onClick={onHandleClickTags}
        colorTheme={colorTheme}
      >
        <Icon
          icon={ICONS.TAG_MULTI}
          width={18}
          height={11}
          scale={0.9}
          color={
            isTagsActive
              ? [colors[colorTheme].navigationPrimaryHover]
              : [colors[colorTheme].navigationPrimary]
          }
        />
        <PrimaryButtonText>Tags</PrimaryButtonText>
      </PrimaryButton>
      <PrimaryButton
        active={isInboxActive}
        onClick={onHandleClickInbox}
        colorTheme={colorTheme}
      >
        <Icon
          icon={ICONS.INBOX}
          width={18}
          height={13}
          scale={0.58}
          color={
            isInboxActive
              ? [colors[colorTheme].navigationPrimaryHover]
              : [colors[colorTheme].navigationPrimary]
          }
        />
        <PrimaryButtonText>Inbox</PrimaryButtonText>
        {inboxCount > 0 && <InboxCounter count={inboxCount} />}
      </PrimaryButton>
      {isAnimationMore && (
        <NavigationPrimaryHidden>
          <PrimaryButton
            active={isArchiveActive}
            onClick={onHandleClickArchive}
            colorTheme={colorTheme}
          >
            <Icon
              icon={ICONS.ARCHIVED}
              active={isArchiveActive}
              width={18}
              height={16}
              scale={1.05}
              color={
                isArchiveActive
                  ? [colors[colorTheme].navigationPrimaryHover]
                  : [colors[colorTheme].navigationPrimary]
              }
            />
            <PrimaryButtonText>Archived Tasks</PrimaryButtonText>
          </PrimaryButton>
          <PrimaryButton
            active={isContactsActive}
            onClick={onHandleClickContacts}
            colorTheme={colorTheme}
          >
            <Icon
              icon={ICONS.CONTACTS}
              width={18}
              height={14}
              scale={0.6}
              color={
                isContactsActive
                  ? [colors[colorTheme].navigationPrimaryHover]
                  : [colors[colorTheme].navigationPrimary]
              }
            />
            <PrimaryButtonText>Contacts</PrimaryButtonText>
          </PrimaryButton>
        </NavigationPrimaryHidden>
      )}
      <ShowMoreButton
        onClick={onHandleClickMore}
        isVisibleMore={isVisibleMore}
        colorTheme={colorTheme}
      >
        <TriangleIcon
          icon={ICONS.TRIANGLE}
          width={11}
          height={5}
          color={[colors[colorTheme].navigationPrimaryShowMore]}
        />
        <ShowMoreTitle>
          {isVisibleMore ? 'Show less' : 'Show more'}
        </ShowMoreTitle>
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
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

import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withState, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeNavigation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import { getPrimaryHiddenNavigationVisibility } from 'redux/store/app-state/app-state.selectors'
import {
  primaryHiddenNavigationVisible,
  primaryHiddenNavigationHide,
} from 'redux/store/app-state/app-state.actions'
import {
  getTimeLine,
  getInboxTasksItems,
} from 'redux/store/tasks/tasks.selectors'

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

const NavigationPrimary = props => {
  const {
    timeLine,
    inboxCount,
    pathname,
    isVisibleMore,
    isDisplayMore,
    onHandleClickMore,
    onHandleClickTasks,
    onHandleClickTags,
    onHandleClickInbox,
    onHandleClickArchive,
    onHandleClickContacts,
  } = props

  const { user } = routes
  const isTasksActive =
    pathname.substring(0, user.tasks.length) === user.tasks && !timeLine
  const isTagsActive = pathname.substring(0, user.tags.length) === user.tags
  const isInboxActive = pathname.substring(0, user.inbox.length) === user.inbox
  const isArchiveActive =
    pathname.substring(0, user.archive.length) === user.archive
  const isContactsActive =
    pathname.substring(0, user.contacts.length) === user.contacts

  return (
    <NavigationPrimaryWrapper isVisibleMore={isVisibleMore}>
      <PrimaryButton active={isTasksActive} onClick={onHandleClickTasks}>
        <Icon
          icon={ICONS.TASKS}
          width={18}
          height={16}
          scale={0.72}
          color={isTasksActive ? ['white'] : ['#676D71']}
        />
        <PrimaryButtonText>My Tasks</PrimaryButtonText>
      </PrimaryButton>
      <PrimaryButton active={isTagsActive} onClick={onHandleClickTags}>
        <Icon
          icon={ICONS.TAG_MULTI}
          width={18}
          height={11}
          scale={0.9}
          color={isTagsActive ? ['white'] : ['#676D71']}
        />
        <PrimaryButtonText>Tags</PrimaryButtonText>
      </PrimaryButton>
      <PrimaryButton active={isInboxActive} onClick={onHandleClickInbox}>
        <Icon
          icon={ICONS.INBOX}
          width={18}
          height={13}
          scale={0.58}
          color={isInboxActive ? ['white'] : ['#676D71']}
        />
        <PrimaryButtonText>Inbox</PrimaryButtonText>
        {inboxCount > 0 && <InboxCounter count={inboxCount} />}
      </PrimaryButton>
      {isDisplayMore && (
        <NavigationPrimaryHidden>
          <PrimaryButton
            active={isArchiveActive}
            onClick={onHandleClickArchive}
          >
            <Icon
              icon={ICONS.ARCHIVED}
              active={isArchiveActive}
              width={18}
              height={16}
              scale={1.05}
              color={isArchiveActive ? ['white'] : ['#676D71']}
            />
            <PrimaryButtonText>Archived Tasks</PrimaryButtonText>
          </PrimaryButton>
          <PrimaryButton
            active={isContactsActive}
            onClick={onHandleClickContacts}
          >
            <Icon
              icon={ICONS.CONTACTS}
              width={18}
              height={14}
              scale={0.6}
              color={isContactsActive ? ['white'] : ['#676D71']}
            />
            <PrimaryButtonText>Contacts</PrimaryButtonText>
          </PrimaryButton>
        </NavigationPrimaryHidden>
      )}
      <ShowMoreButton onClick={onHandleClickMore} isVisibleMore={isVisibleMore}>
        <TriangleIcon
          icon={ICONS.TRIANGLE}
          width={11}
          height={5}
          color={['#41474b']}
        />
        <ShowMoreTitle>
          {isVisibleMore ? 'Show less' : 'Show more'}
        </ShowMoreTitle>
      </ShowMoreButton>
    </NavigationPrimaryWrapper>
  )
}

NavigationPrimary.propTypes = {
  timeLine: PropTypes.bool,
  inboxCount: PropTypes.number,
  pathname: PropTypes.string,
  isVisibleMore: PropTypes.bool,
  isDisplayMore: PropTypes.bool,
  setDisplayMore: PropTypes.func,
  onHandleClickMore: PropTypes.func,
  onHandleClickTasks: PropTypes.func,
  onHandleClickTimeLine: PropTypes.func,
  onHandleClickTags: PropTypes.func,
  onHandleClickInbox: PropTypes.func,
  onHandleClickArchive: PropTypes.func,
  onHandleClickContacts: PropTypes.func,
}

const mapStateToProps = state => ({
  timeLine: getTimeLine(state),
  inboxCount: getInboxTasksItems(state).size,
  pathname: getRoutingPathname(state),
  isVisibleMore: getPrimaryHiddenNavigationVisibility(state),
})

const mapDispatchToProps = {
  changeNavigation,
  primaryHiddenNavigationVisible,
  primaryHiddenNavigationHide,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('isDisplayMore', 'setDisplayMore', false),
  withHandlers({
    onHandleClickMore: props => () => {
      if (props.isVisibleMore) {
        props.primaryHiddenNavigationHide()
        props.setDisplayMore(false)
        return
      }

      props.primaryHiddenNavigationVisible()
      window.setTimeout(() => props.setDisplayMore(true), 350)
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

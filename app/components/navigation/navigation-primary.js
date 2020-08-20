import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, withHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeNavigation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import { getColorTheme } from 'redux/store/auth/auth.selectors'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
import {
  NavigationPrimaryWrapper,
  PrimaryButton,
  PrimaryButtonText,
} from './styles'

const NavigationButtonWithIcon = ({
  active,
  onClick,
  colorTheme,
  icon,
  iconWidth,
  iconHeight,
  iconScale,
  label,
  children,
}) => (
  <PrimaryButton active={active} onClick={onClick} colorTheme={colorTheme}>
    <Icon icon={icon} width={iconWidth} height={iconHeight} scale={iconScale} />
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
    pathname,
    colorTheme,
    onHandleClickTasks,
    onHandleClickTags,
    onHandleClickArchive,
    onHandleClickContacts,
  } = props

  const { user } = routes
  const isTasksActive =
    pathname.substring(0, user.tasks.length) === user.tasks ||
    pathname.substring(0, user.dashboard.length) === user.dashboard
  const isTagsActive = pathname.substring(0, user.tags.length) === user.tags
  const isArchiveActive =
    pathname.substring(0, user.archive.length) === user.archive
  const isContactsActive =
    pathname.substring(0, user.contacts.length) === user.contacts

  return (
    <NavigationPrimaryWrapper>
      <NavigationButtonWithIcon
        active={isTasksActive}
        onClick={onHandleClickTasks}
        colorTheme={colorTheme}
        icon={ICONS.TASK_COMPLETED}
        iconWidth={18}
        iconHeight={18}
        iconScale={0.77}
        label={'My Tasks'}
      />
      <NavigationButtonWithIcon
        active={isTagsActive}
        onClick={onHandleClickTags}
        colorTheme={colorTheme}
        icon={ICONS.TAG_MULTI}
        iconWidth={18}
        iconHeight={11}
        iconScale={0.9}
        label={'Tags'}
      />
      <NavigationButtonWithIcon
        active={isContactsActive}
        onClick={onHandleClickContacts}
        colorTheme={colorTheme}
        icon={ICONS.CONTACTS}
        iconWidth={18}
        iconHeight={14}
        iconScale={0.6}
        label={'Contacts'}
      />
      <NavigationButtonWithIcon
        active={isArchiveActive}
        onClick={onHandleClickArchive}
        colorTheme={colorTheme}
        icon={ICONS.ARCHIVED}
        iconWidth={18}
        iconHeight={16}
        iconScale={1.05}
        label={'Archived Tasks'}
      />
    </NavigationPrimaryWrapper>
  )
}

NavigationPrimary.propTypes = {
  pathname: PropTypes.string,
  colorTheme: PropTypes.string,
  onHandleClickMore: PropTypes.func,
  onHandleClickTasks: PropTypes.func,
  onHandleClickTags: PropTypes.func,
  onHandleClickArchive: PropTypes.func,
  onHandleClickContacts: PropTypes.func,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
  colorTheme: getColorTheme(state),
})

const mapDispatchToProps = {
  changeNavigation,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleClickTasks: props => () =>
      props.changeNavigation(routes.user.tasks),
    onHandleClickTags: props => () => props.changeNavigation(routes.user.tags),
    onHandleClickArchive: props => () =>
      props.changeNavigation(routes.user.archive, 'archived'),
    onHandleClickContacts: props => () =>
      props.changeNavigation(routes.user.contacts),
  })
)(NavigationPrimary)

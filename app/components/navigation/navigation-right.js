import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import {
  fetchTasks,
  fetchArchivedTasks,
  deselectTasks
} from 'redux/store/tasks/tasks.actions'
import { deselectTags } from 'redux/store/tags/tags.actions'
import {
  hideArchivedTasks,
  changeLocation,
} from 'redux/store/app-state/app-state.actions'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

class NavigationRight extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    fetchTasks: PropTypes.func,
    fetchArchivedTasks: PropTypes.func,
    deselectTasks: PropTypes.func.isRequired,
    deselectTags: PropTypes.func.isRequired,
    hideArchivedTasks: PropTypes.func,
    changeLocation: PropTypes.func,
  }

  handleClickTasks = () => {
    this.props.deselectTags()
    this.props.deselectTasks()
    this.props.fetchTasks()
    this.props.changeLocation('/user/tasks')
  }

  handleClickTags = () => {
    this.props.hideArchivedTasks()
    this.props.deselectTasks()
    this.props.changeLocation('/user/tags')
  }

  handleClickArchive = () => {
    this.props.deselectTags()
    this.props.deselectTasks()
    this.props.fetchArchivedTasks()
    this.props.changeLocation('/user/archive')
  }

  handleClickAccount = () => {
    this.props.hideArchivedTasks()
    this.props.deselectTags()
    this.props.deselectTasks()
    this.props.changeLocation('/user/account')
  }

  render() {
    const isTaskActive = this.props.location.pathname === '/user/tasks'
    const tasksButtonClassName = cx({
      'nav-button': true,
      'nav-button--active': isTaskActive,
    })

    const isTagsActive = this.props.location.pathname === '/user/tags'
    const tagsButtonClassName = cx({
      'nav-button': true,
      'nav-button--active': isTagsActive,
    })

    const isArchiveActive = this.props.location.pathname === '/user/archive'
    const archiveButtonClassName = cx({
      'nav-button': true,
      'nav-button--active': isArchiveActive,
    })

    const isAccountActive = this.props.location.pathname === '/user/account'
    const accountButtonClassName = cx({
      'nav-button': true,
      'nav-button--active': isAccountActive,
    })

    return (
      <div className="nav-button-container">
        <div className={tasksButtonClassName} onClick={this.handleClickTasks}>
          <Icon
            icon={ICONS.TASKS}
            width={25}
            height={20}
            color="#fff" />
        </div>
        <div className={tagsButtonClassName} onClick={this.handleClickTags}>
          <Icon
            icon={ICONS.TAG_MULTI}
            width={33}
            height={20}
            scale={1.6}
            color="#fff" />
        </div>
        <div className={archiveButtonClassName} onClick={this.handleClickArchive}>
          <Icon
            icon={ICONS.ARCHIVED}
            width={28}
            height={24}
            scale={1.6}
            color="#fff" />
        </div>
        <div className={accountButtonClassName} onClick={this.handleClickAccount}>
          <Icon
            icon={ICONS.COG_WHEEL}
            width={23}
            height={24}
            scale={1.09}
            color="#fff" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location,
})

const mapDispatchToProps = {
  fetchTasks,
  fetchArchivedTasks,
  deselectTasks,
  deselectTags,
  hideArchivedTasks,
  changeLocation
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationRight)

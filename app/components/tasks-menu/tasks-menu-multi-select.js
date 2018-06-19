import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import velocity from 'velocity-animate'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import FileDownload from 'components/elements/file-download/index'

import config from '../../config/index'

export default class TasksMenuMultiSelect extends PureComponent {

  static propTypes = {
    onAddRemoveTags: PropTypes.func,
    onDelete: PropTypes.func,
    auth: PropTypes.object,
    activeTags: PropTypes.object,
    isVisibleArchivedTasks: PropTypes.bool,
    deselectTasks: PropTypes.func,
  }

  componentDidMount() {
    velocity(this.refs.elem, 'transition.fadeIn', { duration: 600, display: 'flex' })

    // Add listener for close menu
    document.getElementsByClassName('page-overflow-fix')[0].addEventListener("click", this.handleClick, false)
    document.getElementsByClassName('navbar')[0].addEventListener("click", this.handleClick, false)
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillUnmount() {
    // Remove listener for close menu
    document.getElementsByClassName('page-overflow-fix')[0].removeEventListener("click", this.handleClick, false)
    document.getElementsByClassName('navbar')[0].addEventListener("click", this.handleClick, false)
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  state = {
    downloadUrl: null,
  }

  handleClick = event => {
    const elem = findDOMNode(this.refs.elem)
    const notContainsElem = elem
      ? !elem.contains(event.target)
      : true

    const taskPanel = document.getElementsByClassName('task-list-items')[0]
    const elemTaskPanel = findDOMNode(taskPanel)
    const notContainsElemTaskPanel = elemTaskPanel
      ? !elemTaskPanel.contains(event.target)
      : true

    if (notContainsElem && notContainsElemTaskPanel) {
      this.props.deselectTasks()
    }
  }

  handleKeyDown = event => {
    if (event.repeat) {
      return
    }

    switch (event.which) {

      // escape
      case 27:
        this.props.deselectTasks()
        return

      // delete
      case 46:
        this.props.onDelete()
        return

      default:
        return
    }
  }

  handleDownload = () => {
    this.setState({ downloadUrl: `${config.apiURL}/tasks/download-xlsx` })
  }

  handleDownloadComplete = () => {
    this.setState({ downloadUrl: null })
  }

  render() {
    const queryParams = this.props.activeTags.map(tagId => ({
      name: 'tagsIds[]',
      value: tagId,
    }))

    return (
      <div ref="elem" className="multi-select">
        {!this.props.isVisibleArchivedTasks &&
        <Icon
          icon={ICONS.ADD_REMOVE_TAG}
          width={59}
          height={23}
          scale={1.3}
          color={["#8C9DA9"]}
          hoverColor={["#293034"]}
          className="multi-select__items"
          onClick={this.props.onAddRemoveTags}/>
        }
        <Icon
          icon={ICONS.EXPORT}
          width={26}
          height={26}
          scale={0.46}
          color={["#8C9DA9"]}
          hoverColor={["#293034"]}
          className="multi-select__items"
          onClick={this.handleDownload}/>
        <Icon
          icon={ICONS.TRASH}
          width={23}
          height={26}
          color={["#8C9DA9", "#8C9DA9", "#8C9DA9", "#8C9DA9"]}
          hoverColor={["#FF6A6A", "#FF6A6A", "#FF6A6A", "#FF6A6A"]}
          className="multi-select__items"
          onClick={this.props.onDelete}/>
        <FileDownload
          auth={this.props.auth}
          downloadUrl={this.state.downloadUrl}
          queryParams={queryParams}
          onDownloadComplete={this.handleDownloadComplete} />
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'

import {
  deselectTags,
  selectTag,
  updateTag,
} from 'redux/store/tags/tags.actions'
import {
  getCurrentTag,
  getNextTag,
  getPreviousTag,
  getTagsTitle,
} from 'redux/store/tags/tags.selectors'

import commonUtils from 'redux/utils/common'
import { getTagColor } from 'redux/utils/component-helper'

import {
  showDialog,
  deselectDetail
} from 'redux/store/app-state/app-state.actions'

import DetailMenu from 'components/task-tag-detail/detail-menu'
import ContentEditable from 'components/common/content-editable'
import Icon from 'components/icons/icon'
import {ICONS} from 'components/icons/icon-constants'

class TagDetail extends Component {

  static propTypes = {
    tag: PropTypes.object,
    deselectDetail: PropTypes.func,
    deselectTags: PropTypes.func,
    selectTag: PropTypes.func,
    updateTag: PropTypes.func,
    onDelete: PropTypes.func,
    nextTag: PropTypes.object,
    previousTag: PropTypes.object,
    showDialog: PropTypes.func,
    titles: PropTypes.object,
  }

  state = {
    title: this.props.tag === null ? null : this.props.tag.title,
    description: this.props.tag.description === null ? '' : this.props.tag.description
  }

  componentDidMount() {
    document.getElementById('user-container').addEventListener('click', this.handleClickOutSide, false)
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillUnmount() {
    document.getElementById('user-container').removeEventListener('click', this.handleClickOutSide, false)
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillReceiveProps(newProps) {
    const prevId = this.props.tag.id
    const prevTitle = this.props.tag.title
    const prevDescription = this.props.tag.description
    const { id, description, title } = newProps.tag

    if (prevId !== id) {
      this.setState({
        title: newProps.tag === null ? null : title,
        description: description === null ? '' : description
      })
    }

    if (prevTitle !== title) {
      this.setState({ title: newProps.tag  === null ? null : title })
    }

    if (prevDescription !== description) {
      this.setState({ description: description === null ? '' : description })
    }
  }

  // Back to tag list
  handleToggleTagList = () => {
    this.props.deselectTags()
  }

  // Previous and next tag
  handleClickOutSide = event => {
    const detail = findDOMNode(this.refs.detail)

    if (!detail.contains(event.target)) {
      document.removeEventListener("keydown", this.handleKeyDown, false)
    }
  }

  handleRemoveEventListener = event => {
    event.stopPropagation()
    document.removeEventListener("keydown", this.handleKeyDown, false)
  }

  handleAddEventListener = () => {
    document.addEventListener("keydown", this.handleKeyDown, false)
  }

  handleKeyDown = event => {
    if (event.repeat) {
      return
    }

    switch (event.which) {

      // escape
      case 27:
        this.props.deselectDetail('tag')
        this.props.deselectTags()
        return

      // backspace
      case 8:
        this.props.deselectDetail('tag')
        this.props.deselectTags()
        return

      // arrow left key
      case 37:
        this.handlePreviousTag()
        return

      // arrow right key
      case 39:
        this.handleNextTag()
        return

      default:
        return
    }
  }

  handleNextTag = () => {
    if (!this.props.nextTag) {
      return
    }

    this.props.selectTag(this.props.nextTag.id)
  }

  handlePreviousTag = () => {
    if (!this.props.previousTag) {
      return
    }

    this.props.selectTag(this.props.previousTag.id)
  }

  // Subject
  handleTitleChange = event => {
    const originalTitle = this.props.tag.title
    const title = event.target.value
    const titles = this.props.titles

    if (originalTitle === title) {
      return
    }

    // Validation of title conflict
    if (titles.includes(title)) {
      toast.error(errorMessages.tags.titleConflict, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      })

      this.setState({ title: originalTitle })
      return
    }

    this.setState({ title })
    this.props.updateTag(this.props.tag, title, 'title')
  }

  // Delete tag
  handleDelete = () => {
    this.props.showDialog('tag-delete-confirm', {tag: this.props.tag})
  }

  // Color Select
  handleColorSelect = index => {
    this.props.updateTag(this.props.tag, index, 'colorIndex')
  }

  // Description
  handleDescriptionChange = event => {
    this.setState({ description: event.target.value })
  }

  handleDescriptionUpdate = () => {
    const description = this.state.description
    this.props.updateTag(this.props.tag, description, 'description')
  }

  getColorIndex() {
    return this.props.tag.colorIndex === null
      ? commonUtils.computeIntHash(this.props.tag.title, 10)
      : this.props.tag.colorIndex
  }

  render() {
    // tag not filled
    if (!this.props.tag) {
      return (<div className="detail-dialog-scroll-area" />)
    }

    // render color options
    const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    const colorItems = colors.map(index => {
      const colorClass = `color-selector__item cl-${index}`
      return (
        <li
          key={index}
          className={colorClass}
          onClick={() => this.handleColorSelect(index)} />
      )
    })

    // resolve other properties
    const tagTitle = this.state.title
    const colorIndex = this.getColorIndex()
    const tagColor = getTagColor(colorIndex)

    return (
      <div
        ref="detail"
        className="detail"
        onClick={this.handleAddEventListener}>

        <DetailMenu
          back={this.handleToggleTagList}
          previous={this.handlePreviousTag}
          next={this.handleNextTag} />

        <div className="detail-inner">
          <div className="detail-content detail-content__top">
            <div className="detail-content__subject detail-content__subject--tag detail-subject">
              <Icon
                className="detail-subject__tag-color"
                icon={ICONS.TAG}
                width={37}
                height={20}
                scale={1.81}
                color={tagColor}/>
              <span onClick={this.handleRemoveEventListener}>
                <ContentEditable
                  ref="subject"
                  className="detail-subject__content detail-subject__content--tag"
                  html={tagTitle}
                  enforcePlainText
                  onChange={this.handleTitleChange} />
              </span>
            </div>
            <div className="detail-content__delete">
              <Icon
                icon={ICONS.TRASH}
                width={23}
                height={26}
                scale={1}
                color="#ff8181"
                onClick={this.handleDelete}/>
            </div>
          </div>

          <div className="detail-content detail-content__center detail-content__center--column">
            <div className="detail-content__tag-color">
              <div className="color-selector color-selector__label">
                Select a color
              </div>
              <ul className="color-selector__options">
                {colorItems}
              </ul>
            </div>
            <div className="detail-content__description detail-content__description--tag">
              <textarea
                ref="description"
                onClick={this.handleRemoveEventListener}
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                onBlur={this.handleDescriptionUpdate}
                placeholder="Add a Description" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tag: getCurrentTag(state),
  nextTag: getNextTag(state),
  previousTag: getPreviousTag(state),
  titles: getTagsTitle(state)
})

const mapDispatchToProps = {
  deselectDetail,
  deselectTags,
  selectTag,
  updateTag,
  showDialog,
}

export default connect(mapStateToProps, mapDispatchToProps)(TagDetail)

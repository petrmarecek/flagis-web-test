import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import commonUtils from 'redux/utils/common'
import styled from 'styled-components'

import { getTagColor } from 'redux/utils/component-helper'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

const TagItem = styled.li`
  margin: 10px 0 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TagTitle = styled.div`
  margin: 0 0 0 5px;
`;

export default class AddRemoveTagsItem extends PureComponent {

  static propTypes = {
    tag: PropTypes.object,
    tagsLists: PropTypes.object,
    activeTags: PropTypes.object,
    inactiveTags: PropTypes.object,
    otherTags: PropTypes.object,
    addTags: PropTypes.object,
    removeTags: PropTypes.object,
    addToList: PropTypes.func,
    deleteFromList: PropTypes.func,
  }

  state = { type: ICONS.TAG_INACTIVE }

  componentWillMount() {
    this.setState({ type: this.getTagType() })
  }

  getColorIndex() {
    return this.props.tag.colorIndex === null
      ? commonUtils.computeIntHash(this.props.tag.title, 10)
      : this.props.tag.colorIndex
  }

  getTagType = () => {
    const tagsLists = this.props.tagsLists
    const tag = this.props.tag.id
    const size = tagsLists.size
    let count = 0
    let icon = ICONS.TAG_INACTIVE

    for (const tagsList of tagsLists) {
      if (tagsList.includes(tag)) {
        count++
      }
    }

    if (count === 0) {
      this.props.addToList(tag, 'inactiveTags')
    }

    if (count === size) {
      icon = ICONS.TAG
      this.props.addToList(tag, 'activeTags')
    }

    if (count > 0 && count !== size) {
      icon = ICONS.TAG_HALF
      this.props.addToList(tag, 'otherTags')
    }

    return icon
  }

  handleClicked = () => {
    const tag = this.props.tag.id

    if (this.props.activeTags.includes(tag)) {
      this.setState({ type: ICONS.TAG_INACTIVE })
      this.props.deleteFromList(tag, 'activeTags')
      this.props.addToList(tag, 'inactiveTags')

      if (!this.props.removeTags.includes(tag)) {
        this.props.addToList(tag, 'removeTags')
      }

      if (this.props.addTags.includes(tag)) {
        this.props.deleteFromList(tag, 'addTags')
      }

      return
    }

    if (this.props.otherTags.includes(tag)) {
      this.setState({ type: ICONS.TAG })
      this.props.deleteFromList(tag, 'otherTags')
      this.props.addToList(tag, 'activeTags')

      if (!this.props.addTags.includes(tag)) {
        this.props.addToList(tag, 'addTags')
      }

      if (this.props.removeTags.includes(tag)) {
        this.props.deleteFromList(tag, 'removeTags')
      }

      return
    }

    if (this.props.inactiveTags.includes(tag)) {
      this.setState({ type: ICONS.TAG })
      this.props.deleteFromList(tag, 'inactiveTags')
      this.props.addToList(tag, 'activeTags')

      if (!this.props.addTags.includes(tag)) {
        this.props.addToList(tag, 'addTags')
      }

      if (this.props.removeTags.includes(tag)) {
        this.props.deleteFromList(tag, 'removeTags')
      }

      return
    }
  }

  render() {
    const tag = this.props.tag
    const colorIndex = this.getColorIndex()
    const tagColor = getTagColor(colorIndex)

    return (
      <TagItem onClick={this.handleClicked}>
        <Icon
          icon={this.state.type}
          width={28}
          height={15}
          scale={1.36}
          color={[tagColor]} />
        <TagTitle>
          {tag.title}
        </TagTitle>
      </TagItem>
    )
  }
}

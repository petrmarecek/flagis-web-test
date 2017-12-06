import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dateUtil from 'redux/utils/date'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class CommentListItem extends Component {

  static propTypes = {
    comment: PropTypes.object,
  }

  render() {
    const dateText = this.props.comment.id === null
      ? 'Not synced'
      : dateUtil.formatDate(this.props.comment.createdAt)

    return (
      <li className="comment">
        <Icon
          className="comment__icon-comment"
          icon={ICONS.COMMENT}
          width={15}
          height={14}
          scale={0.57}
          color="#8C9DA9"/>
        <div className="comment__author">{this.props.comment.author}</div>
        <div className="comment__date">{dateText}</div>
        <div className="comment__content">{this.props.comment.content}</div>
      </li>
    )
  }
}

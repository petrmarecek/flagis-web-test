import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import DialogBase from 'components/dialogs/dialog-base'

import { getColorIndex } from 'redux/utils/component-helper'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class ConfirmTagDeleteDialog extends DialogBase {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    windowHeight: PropTypes.number,
    windowWidth: PropTypes.number,
  }

  componentDidMount() {
    this.centerDialog()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.windowWidth !== this.props.windowWidth) {
      this.centerDialog()
    }

    if (newProps.windowHeight !== this.props.windowHeight) {
      this.centerDialog()
    }
  }

  handleDelete = () => {
    this.props.onDelete(this.props.data.tag)
    this.props.onHide()
  }

  render() {
    const tag = this.props.data.tag
    const colorIndex = getColorIndex(tag.colorIndex, tag.title)
    const tagClass = classnames({
      tag: true,
      'tag--inline': true,
      [`cl-${colorIndex}`]: true
    })

    return (
      <div className="dialog tag-delete" ref="dialogWin">
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={14}
          height={14}
          color={["#293034"]}
          className="dialog__close"
          onClick={this.props.onHide}/>
        <div className="dialog__title-small">Delete confirmation</div>
        <form
          className="common-form"
          onSubmit={this.handleDelete}>
          <div className="dialog__content dialog__content--one-item">
            Do you really want to delete the tag <span className={tagClass}>{this.props.data.tag.title}</span> and all it's
            task relationships?
          </div>
          <div className="button-row">
            <div className="button-row__right">
              <button
                type="button"
                className="btn-default btn-default--red"
                onClick={this.handleDelete}>Delete</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

}

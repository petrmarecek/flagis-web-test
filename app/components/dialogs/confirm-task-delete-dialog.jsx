import React from 'react'
import PropTypes from 'prop-types'
import DialogBase from './dialog-base'

import { ICONS } from '../icons/icon-constants'
import Icon from '../icons/icon'

export default class ConfirmTaskDeleteDialog extends DialogBase {

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
    this.props.onDelete(this.props.data.tasks)
    this.props.onHide()
  }

  render() {
    return (
      <div className="dialog task-delete" ref="dialogWin">
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={14}
          height={14}
          color="#293034"
          className="dialog__close"
          onClick={this.props.onHide}/>
        <div className="dialog__title-small">Delete confirmation</div>
        <form
          className="common-form"
          onSubmit={this.handleDelete}>
          <div className="dialog__content dialog__content--one-item">
            Do you really want to delete the task(s)?
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

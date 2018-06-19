import React from 'react'
import PropTypes from 'prop-types'
import DialogBase from 'components/dialogs/dialog-base'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class ConfirmTreeItemTagDeleteDialog extends DialogBase {

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
    this.props.onDelete(this.props.data.treeItem)
  }

  render() {

    return (
      <div className="dialog tree-item-tag-delete" ref="dialogWin">
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
            Do you really want to delete the filter?
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

import React from 'react'
import PropTypes from 'prop-types'
import DialogBase from 'components/dialogs/dialog-base'

import TagAutocompleteInput from 'components/elements/tag-autocomplete/tag-autocomplete-input'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class UpdateTreeItemTagDialog extends DialogBase {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
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
    const context = {
      source: 'treeUpdate',
      parentId: this.props.data.treeItem.parentId,
      updatedTreeItem: {
        treeItemId: this.props.data.treeItem.id,
        tagId: this.props.data.treeItem.tag.id
      }
    }

    return (
      <div className="dialog tree-item-update" ref="dialogWin">
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={14}
          height={14}
          color="#293034"
          className="dialog__close"
          onClick={this.props.onHide}/>
        <div className="dialog__title-small">Filter item</div>
        <div className="dialog__content dialog__content--one-item">
          <TagAutocompleteInput
            id="treeUpdate"
            ref="input"
            context={context}
            allowMultiSelect={false}/>
        </div>
        <div className="button-row">
          <div className="button-row__right">
            <button
              type="button"
              className="btn-default btn-default--red"
              onClick={this.handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    )
  }

}

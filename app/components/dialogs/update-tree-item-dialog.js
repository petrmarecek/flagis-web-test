import React from 'react'
import PropTypes from 'prop-types'
import DialogBase from 'components/dialogs/dialog-base'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class UpdateTreeItemDialog extends DialogBase {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    windowHeight: PropTypes.number,
    windowWidth: PropTypes.number,
  }

  state = {
    title: this.props.data.treeItem.title
  }

  componentDidMount() {
    this.centerDialog()

    this.refs.title.select()
    this.refs.title.focus()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.windowWidth !== this.props.windowWidth) {
      this.centerDialog()
    }

    if (newProps.windowHeight !== this.props.windowHeight) {
      this.centerDialog()
    }
  }

  handleUpdate = event => {

    event.preventDefault()

    // TODO: check conflicts
    // if (!canUpdate) {
    //   toastr.error("Cannot update filter item name. The name already exists in hierarchy.", "Duplicate item")
    //   return
    // }

    // run update
    this.props.onUpdate(this.props.data.treeItem, this.state.title)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.data.treeItem)
  }

  handleChange = event => {
    this.setState({title: event.target.value})
  }

  render() {
    return (
      <div className="dialog tree-item-update" ref="dialogWin">
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={14}
          height={14}
          color={["#293034"]}
          className="dialog__close"
          onClick={this.props.onHide}/>
        <div className="dialog__title-small">Filter group</div>
        <form
          className="common-form"
          onSubmit={this.handleUpdate}>
          <div className="dialog__content dialog__content--one-item">
            <input
              type="text"
              className="tree-item-name"
              name="TreeItemName"
              onChange={this.handleChange}
              value={this.state.title}
              ref="title"/>
          </div>
          <div className="button-row">
            <div className="button-row__right">
              <button
                type="button"
                className="btn-default btn-default--red"
                onClick={this.handleDelete}>Delete</button>
              <button
                type="button"
                className="btn-default btn-default--green"
                onClick={this.handleUpdate}>Update</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}


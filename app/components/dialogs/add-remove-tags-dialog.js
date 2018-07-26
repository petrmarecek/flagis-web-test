import React from 'react'
import PropTypes from 'prop-types'
import DialogBase from 'components/dialogs/dialog-base'

import AddRemoveTagsItem from 'components/dialogs/add-remove-tags-item'
import ShadowScrollbar from '../common/shadow-scrollbar'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class AddRemoveTagsDialog extends DialogBase {

  static propTypes = {
    data: PropTypes.object,
    tags: PropTypes.object,
    activeTags: PropTypes.object,
    inactiveTags: PropTypes.object,
    otherTags: PropTypes.object,
    addTags: PropTypes.object,
    removeTags: PropTypes.object,
    tagsLists: PropTypes.object,
    addToList: PropTypes.func,
    deleteFromList: PropTypes.func,
    clearLists: PropTypes.func,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func,
    windowHeight: PropTypes.number,
    windowWidth: PropTypes.number,
  }

  componentDidMount() {
    this.centerDialog()
  }

  componentWillUnmount() {
    this.props.clearLists()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.windowWidth !== this.props.windowWidth) {
      this.centerDialog()
    }

    if (newProps.windowHeight !== this.props.windowHeight) {
      this.centerDialog()
    }
  }

  render() {
    const tagsItems = this.props.tags.items
    const isScroll = this.getScrollDialog(tagsItems)
    const scrollStyle = {
      height: `calc(100vh - 385px)`,
      shadowHeight: 20,
      boxShadowTop: 'inset 0 20px 20px -10px #fafafa',
      boxShadowBottom: 'inset 0 -20px 20px -10px #fafafa',
      overflow: 'hidden'
    }
    const tags = (
      <ul className="add-remove-tags-dialog__list">
        {tagsItems.map((tag, key) => (
          <AddRemoveTagsItem
            key={key}
            tag={tag}
            activeTags={this.props.activeTags}
            inactiveTags={this.props.inactiveTags}
            otherTags={this.props.otherTags}
            addTags={this.props.addTags}
            removeTags={this.props.removeTags}
            addToList={this.props.addToList}
            deleteFromList={this.props.deleteFromList}
            tagsLists={this.props.tagsLists}/>
        ))}
      </ul>
    )

    return (
      <div className="dialog add-remove-tags-dialog" ref="dialogWin">
        <Icon
          icon={ICONS.CROSS_SIMPLE}
          width={14}
          height={14}
          color={["#293034"]}
          className="dialog__close"
          onClick={this.props.onHide} />
        <div className="dialog__title">Add/remove tags on selected tasks</div>
        <div className="dialog__line"/>
        <div className="dialog__content">
          {!isScroll && tags}
          {isScroll &&
          <ShadowScrollbar style={scrollStyle}>
            {tags}
          </ShadowScrollbar>}
        </div>
        <div className="button-row">
          <div className="button-row__right">
            <button
              type="button"
              className="btn-default btn-default--green"
              onClick={this.props.onSubmit}>Update</button>
          </div>
        </div>
      </div>
    )
  }
}

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import commonUtils from 'redux/utils/common'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

export default class TagAutocompleteItem extends PureComponent {

  static propTypes = {
    onDelete: PropTypes.func,
    model: PropTypes.object,
  }

  handleDelete = event => {
    event.stopPropagation()
    this.props.onDelete(this.props.model);
  }

  getColorIndex() {
    return this.props.model.colorIndex === null
      ? commonUtils.computeIntHash(this.props.model.title, 10)
      : this.props.model.colorIndex
  }

  render() {
    const colorIndex = this.getColorIndex();
    const tagClasses = `tag cl-${colorIndex}`;

    return (
      <li className={tagClasses} key={this.props.model.id}>
        <span className="tag__title">{this.props.model.title}</span>
        <Icon
          className="tag__delete-icon"
          icon={ICONS.CROSS_SIMPLE}
          width={11}
          height={11}
          scale={0.78}
          color="#fff"
          hoverColor="#eee"
          onClick={this.handleDelete}/>
      </li>
    )
  }
}

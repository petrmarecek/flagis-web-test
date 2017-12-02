import React, { Component } from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { hintsClickOutside, tagHintSelected } from '../../redux/store/app-state/app-state.actions'
import { getTagHints } from '../../redux/store/app-state/app-state.selectors'
import commonUtils from '../../redux/utils/common'

class TagsHints extends Component {

  static propTypes = {
    onItemSelected: PropTypes.func,
    onHintClicked: PropTypes.func,
    selectionIndex: PropTypes.number,
    data: PropTypes.object,
    hintsClickOutside: PropTypes.func,
    tagHintSelected: PropTypes.func,
  }

  componentDidMount() {
    this.preventScreenOverflow()
  }

  raiseItemSelectedEvent() {

    // if (this.state.newItemSelected) {
    //
    //   // new item selected
    //   this.props.onItemSelected({ isNew: true, id: -1, text: this.props.data.search, colorIndex: null })
    // } else {
    //
    //   // existing tag selected
    //   const target = this.state.visibleTags.filter((item, index) =>
    //     index === this.state.hintsSelectionIndex)[0]
    //
    //   if (!target)
    //     return
    //
    //   this.props.onItemSelected({ isNew: false, id: target.id, text: target.title, colorIndex: target.colorIndex })
    // }
  }

  handleClick(event, tag) {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    this.props.tagHintSelected(this.props.data.autocompleteId, this.props.data.context, {
      id: tag.id,
      isNew: false,
      title: tag.title,
    })
  }

  handleClickNew = event => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    this.props.tagHintSelected(this.props.data.autocompleteId, this.props.data.context, {
      id: commonUtils.clientUid(),
      isNew: true,
      title: this.props.data.search.trim(),
    })
  }

  componentDidUpdate() {
    this.raiseItemSelectedEvent()
    this.preventScreenOverflow()
  }

  preventScreenOverflow() {

    // const container = $(this.refs.container)
    //
    // // detect heights
    // const screenHeight = $(document).outerHeight()
    // const screeWidth = $(document).outerWidth()
    // const height = container.outerHeight(false)
    // const width = container.outerWidth(false)
    //
    // const currentTop = container.offset().top
    // const currentLeft = container.offset().left
    // if (currentTop === null || currentLeft === null) {
    //   return
    // }
    //
    // if (currentTop + height > screenHeight) {
    //   container.css({top: 'auto', bottom: 5})
    // }
    //
    // if (currentLeft + width > screeWidth) {
    //   const overflow = screeWidth - currentLeft - width
    //   container.css({left: overflow - 10})
    // }
  }

  handleClickOutside() {
    this.props.hintsClickOutside(this.props.data.context)
  }

  render() {
    const style = {
      top: this.props.data.position.top,
      left: this.props.data.position.left,
    }

    const newItemClass = classnames({
      'tag-hint__item': true,
      'selected': this.props.data.newItemSelected
    })

    const hints = this.props.data.visibleTags.map((tag, index) => {
      const hintClass = classnames({
        'tag-hint__item': true,
        'selected': index === this.props.data.selectionIndex
      })
      return (
        <li key={tag.title}
          className={hintClass}
          onClick={event => this.handleClick(event, tag)}>{tag.title}</li>
      )
    })

    return (
      <ul ref="container" className="tag-hint" style={style}>
        {this.props.data.visibleTags.size !== 0 &&
          <li className="tag-hint__item-section">Select existing</li>
        }
        {hints}
        {this.props.data.newItemVisible &&
          <li className="tag-hint__item-section">Create a new tag</li>}
        {this.props.data.newItemVisible &&
          <li className={newItemClass}
            onClick={this.handleClickNew}>{this.props.data.search}</li>
        }
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  data: getTagHints(state),
})

const mapDispatchToProps = {
  hintsClickOutside,
  tagHintSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  onClickOutside(TagsHints)
)

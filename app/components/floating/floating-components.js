import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTagHintsVisibility } from 'redux/store/app-state/app-state.selectors'

import TagHints from 'components/floating/tag-hints'

class FloatingComponents extends Component {

  static propTypes = {
    showTagHints: PropTypes.bool,
  }

  render() {
    return (
      <div>
        {this.props.showTagHints && <TagHints outsideClickIgnoreClass="js-ignore-hints-hide" />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showTagHints: getTagHintsVisibility(state),
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FloatingComponents)

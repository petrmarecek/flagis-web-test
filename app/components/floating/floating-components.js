import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
  showTagHints: state.appState.tagHints.isVisible,
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FloatingComponents)

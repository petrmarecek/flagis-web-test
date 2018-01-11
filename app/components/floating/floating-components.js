import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTagHintsVisibility } from 'redux/store/app-state/app-state.selectors'

import TagHints from 'components/floating/tag-hints'

const FloatingComponents = props => {
  return (
    <div>
      {props.showTagHints && <TagHints outsideClickIgnoreClass="js-ignore-hints-hide" />}
    </div>
  )
}

FloatingComponents.propTypes = {
  showTagHints: PropTypes.bool,
}
const mapStateToProps = state => ({
  showTagHints: getTagHintsVisibility(state),
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FloatingComponents)

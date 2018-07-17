import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { getTagDetail } from 'redux/store/app-state/app-state.selectors'

import TagsContent from 'components/contents/tags-content'
import DetailContent from 'components/contents/detail-content'
import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import TagTreeContent from 'components/contents/tag-tree-content'

const TagPage = ({ onGetContent }) => (
  <div>
    <LeftPanel>
      <TagTreeContent/>
    </LeftPanel>
    <CenterPanel>
      {onGetContent()}
    </CenterPanel>
  </div>
)


TagPage.propTypes = {
  onGetContent: PropTypes.func,
}

const mapStateToProps = state => ({
  tagDetail: getTagDetail(state),
})

const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onGetContent: props => () => {
      if (props.tagDetail) {
        return (
          <DetailContent/>
        )
      } else {
        return (
          <TagsContent/>
        )
      }
    }
  })
)(TagPage)

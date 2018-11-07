import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTagDetail } from 'redux/store/app-state/app-state.selectors'

import TagsContent from 'components/contents/tags-content'
import DetailContent from 'components/contents/detail-content'
import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import TagTreeContent from 'components/contents/tag-tree-content'

const TagPage = ({ tagDetail }) => (
  <div>
    <LeftPanel>
      <TagTreeContent/>
    </LeftPanel>
    <CenterPanel>
      {tagDetail ? <DetailContent/> : <TagsContent/>}
    </CenterPanel>
  </div>
)

TagPage.propTypes = {
  tagDetail: PropTypes.bool,
}

const mapStateToProps = state => ({
  tagDetail: getTagDetail(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TagPage)
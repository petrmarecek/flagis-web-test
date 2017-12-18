import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTaskTagDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import TagTreeContent from 'components/contents/tag-tree-content'
import ArchiveContent from 'components/contents/archive-content'
import ArchiveDetailContent from 'components/contents/archive-detail-content'

class ArchivePage extends React.Component {

  static propTypes = {
    archiveDetail: PropTypes.object,
  }

  getContent() {
    if (this.props.archiveDetail.archive) {
      return (
        <ArchiveDetailContent />
      )
    }

    return (
      <ArchiveContent />
    )
  }

  render() {
    const content = this.getContent()
    return (
      <div>
        <LeftPanel>
          <TagTreeContent />
        </LeftPanel>
        <CenterPanel>
          {content}
        </CenterPanel>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  archiveDetail: getTaskTagDetail(state)
})

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(ArchivePage)

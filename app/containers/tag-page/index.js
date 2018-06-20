import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getDetail } from 'redux/store/app-state/app-state.selectors'

import TagsContent from 'components/contents/tags-content'
import TagDetailContent from 'components/contents/tag-detail-content'
import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import TagTreeContent from 'components/contents/tag-tree-content'

class TagPage extends PureComponent {

  static propTypes = {
    detail: PropTypes.object,
  }

  getContent() {
    if (this.props.detail.tag) {
      return (
        <TagDetailContent />
      )
    }

    return (
      <TagsContent />
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
  detail: getDetail(state),
})

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(TagPage)

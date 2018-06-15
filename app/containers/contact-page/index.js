import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { getTaskTagDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import TagTreeContent from 'components/contents/tag-tree-content'
import ContactContent from 'components/contents/contact-content'
import ContactDetailContent from 'components/contents/contact-detail-content'

const ContactPage = ({ onGetContent }) => {
  const content = onGetContent()

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

ContactPage.propTypes = {
  detail: PropTypes.object,
  onGetContent: PropTypes.func,
}

const mapStateToProps = state => ({
  detail: getTaskTagDetail(state),
})

const mapDispatchToProps = {}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onGetContent: props => () => {
      if (props.detail.contact) {
        return (
          <ContactDetailContent/>
        )
      } else {
        return (
          <ContactContent/>
        )
      }
    }
  })
)(ContactPage)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import { changeLocation, setDetail } from 'redux/store/app-state/app-state.actions'
import { selectTag } from 'redux/store/tags/tags.actions'
import { getTagsItems, getCurrentTagId } from 'redux/store/tags/tags.selectors'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

import TagsContent from 'components/contents/tags-content'
import DetailContent from 'components/contents/detail-content'
import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import TagTreeContent from 'components/contents/tag-tree-content'

const TagPage = ({ tagsItems, pathname }) => {
  const template = '/user/tags/'
  const numberTemplate = template.length
  const tagId = pathname.substring(numberTemplate)
  const isTagId = tagsItems.includes(tagId)

  return (
    <div>
      <LeftPanel>
        <TagTreeContent/>
      </LeftPanel>
      <CenterPanel>
        {isTagId ? <DetailContent/> : <TagsContent/>}
      </CenterPanel>
    </div>
  )
}

TagPage.propTypes = {
  tagsItems: PropTypes.object,
  pathname: PropTypes.string,
}

const mapStateToProps = state => ({
  tagsItems: getTagsItems(state),
  currentTagId: getCurrentTagId(state),
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = {
  changeLocation,
  setDetail,
  selectTag,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidUpdate() {
      const {
        tagsItems,
        pathname,
        currentTagId,
        selectTag,
        changeLocation,
        setDetail
      } = this.props

      const template = '/user/tags/'
      const numberTemplate = template.length
      const tagId = pathname.substring(numberTemplate)
      const isTagId = tagsItems.includes(tagId)
      
      if (!isTagId) {
        const template = '/user/tags'

        if (tagsItems.size === 0) {
          return
        }
        
        if (pathname !== template) {
          changeLocation(template)
        }

        return
      }

      if (currentTagId === tagId) {
        return
      }

      selectTag(tagId)
      setDetail('tag')
    }
  })
)(TagPage)
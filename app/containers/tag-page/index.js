import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import { selectTag } from 'redux/store/tags/tags.actions'
import { getTagsItems, getCurrentTagId } from 'redux/store/tags/tags.selectors'
import { changeLocation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import { setDetail } from 'redux/store/app-state/app-state.actions'

// components
import LeftPanelPrimaryContent from 'components/contents/left-panel-primary-content'
import CenterPanel from 'components/panels/center-panel'
import DetailContent from 'components/contents/detail-content'
import TagsContent from 'components/contents/tags-content'
import { useTheme } from 'styled-components'

const TagPage = ({ tagsItems, pathname }) => {
  const template = '/user/tags/'
  const numberTemplate = template.length
  const tagId = pathname.substring(numberTemplate)
  const isTagId = tagsItems.includes(tagId)
  const theme = useTheme()

  return (
    <div>
      <LeftPanelPrimaryContent />
      <CenterPanel style={{ backgroundColor: theme.tasks.wrapperBgColor }}>
        {isTagId ? <DetailContent /> : <TagsContent />}
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
      const { tagsItems, pathname, currentTagId } = this.props

      // redirect to tasks
      if (pathname === routes.user.tasks) {
        this.props.changeLocation(routes.user.tasks)
        return
      }

      let template = '/user/tags/'
      const numberTemplate = template.length
      const tagId = pathname.substring(numberTemplate)
      const isTagId = tagsItems.includes(tagId)

      if (!isTagId) {
        template = routes.user.tags

        if (tagsItems.size === 0) {
          return
        }

        if (pathname !== template) {
          this.props.changeLocation(template)
        }

        return
      }

      if (currentTagId === tagId) {
        return
      }

      this.props.selectTag(tagId)
      this.props.setDetail('tag')
    },
  })
)(TagPage)

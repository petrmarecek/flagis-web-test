import React from 'react'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeLocation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// components
import LeftPanelPrimaryContent from 'components/contents/left-panel-primary-content'
import ColorThemeContent from 'components/contents/color-theme-content'

const ColorThemePage = () => (
  <div>
    <LeftPanelPrimaryContent />
    <ColorThemeContent />
  </div>
)

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = { changeLocation }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const { colorTheme } = routes.user.account.settings
      const { pathname } = this.props

      if (colorTheme === pathname) {
        return
      }

      this.props.changeLocation(colorTheme)
    },
  })
)(ColorThemePage)

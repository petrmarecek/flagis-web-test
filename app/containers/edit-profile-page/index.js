import React from 'react'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import { changeLocation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// components
import LeftPanelPrimaryContent from 'components/contents/left-panel-primary-content'
import EditProfileContent from 'components/contents/edit-profile-content'

const EditProfilePage = () => (
  <div>
    <LeftPanelPrimaryContent />
    <EditProfileContent />
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
      const { editProfile } = routes.user.account.settings
      const { pathname } = this.props

      if (editProfile === pathname) {
        return
      }

      this.props.changeLocation(editProfile)
    },
  })
)(EditProfilePage)

import React from 'react'

// components
import EditProfile from 'components/common/edit-profile'

// styles
import { CenterPanelScroll } from 'components/panels/styles'

const EditProfileContent = () => (
  <CenterPanelScroll offsetTop={108} offsetBottom={0}>
    <EditProfile />
  </CenterPanelScroll>
)

export default EditProfileContent

import React from 'react'

// components
import LeftPanel from 'components/panels/left-panel'
import NavigationDefault from '../navigation/navigation-default'
import NavigationPrimary from '../navigation/navigation-primary'
import TagTreeContainer from 'components/tag-tree'

const LeftPanelPrimaryContent = () => (
  <LeftPanel>
    <NavigationDefault />
    <NavigationPrimary />
    <TagTreeContainer />
  </LeftPanel>
)

export default LeftPanelPrimaryContent

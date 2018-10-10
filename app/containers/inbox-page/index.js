import React  from 'react'

import LeftPanel from 'components/panels/left-panel'
import TagTreeContent from 'components/contents/tag-tree-content'
import CenterPanel from 'components/panels/center-panel'
import InboxContent from 'components/contents/inbox-content'

const InboxPage = () => (
  <div>
    <LeftPanel>
      <TagTreeContent/>
    </LeftPanel>
    <CenterPanel>
      <InboxContent/>
    </CenterPanel>
  </div>
)

export default InboxPage

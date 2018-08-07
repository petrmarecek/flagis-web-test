import React from 'react'
import PropTypes from 'prop-types'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import { Menu, LeftMenu, RightMenu } from './styles'

const DetailMenu = props => {
  return (
    <Menu>
      <LeftMenu>
        <Icon
          icon={ICONS.ARROW_LEFT}
          width={23}
          height={18}
          color={["#8C9DA9"]}
          hoverColor={["#00FFC7"]}
          onClick={props.back}/>
      </LeftMenu>
      <RightMenu>
        <Icon
          icon={ICONS.ARROW_SIMPLE_LEFT}
          width={11}
          height={17}
          color={["#8C9DA9"]}
          hoverColor={["#00FFC7"]}
          onClick={props.previous}/>
        <Icon
          icon={ICONS.ARROW_SIMPLE_RIGHT}
          width={11}
          height={17}
          color={["#8C9DA9"]}
          hoverColor={["#00FFC7"]}
          onClick={props.next}/>
      </RightMenu>
    </Menu>
  )
}

DetailMenu.propTypes = {
  back: PropTypes.func,
  previous: PropTypes.func,
  next: PropTypes.func,
}

export default DetailMenu

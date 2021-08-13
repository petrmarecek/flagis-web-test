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
          color={['#a2a2a2']}
          hoverColor={['#00CD78']}
          onClick={props.back}
        />
      </LeftMenu>
      <RightMenu>
        <Icon
          icon={ICONS.ARROW_SIMPLE_LEFT}
          width={11}
          height={17}
          color={['#a2a2a2']}
          hoverColor={['#00CD78']}
          onClick={props.previous}
        />
        <Icon
          icon={ICONS.ARROW_SIMPLE_RIGHT}
          width={11}
          height={17}
          color={['#a2a2a2']}
          hoverColor={['#00CD78']}
          onClick={props.next}
        />
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

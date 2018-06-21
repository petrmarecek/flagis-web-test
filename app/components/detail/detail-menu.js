import React from 'react'
import PropTypes from 'prop-types'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import styled from 'styled-components'

const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 42px;
`;

const LeftMenu = styled.div`
  flex: 1;
  margin-left: 8px;
`;

const RightMenu = styled.div`
  flex: 1;
  text-align: right;
  margin-right: 5px;
  
  svg {
    margin-left: 20px;
  }
`;

const DetailMenu = props => {
  return (
    <Menu>
      <LeftMenu>
        <Icon
          icon={ICONS.DETAIL_BACK}
          width={23}
          height={18}
          color={["#8C9DA9"]}
          hoverColor={["#00FFC7"]}
          onClick={props.back}/>
      </LeftMenu>
      <RightMenu>
        <Icon
          icon={ICONS.DETAIL_PREVIOUS}
          width={11}
          height={17}
          color={["#8C9DA9"]}
          hoverColor={["#00FFC7"]}
          onClick={props.previous}/>
        <Icon
          icon={ICONS.DETAIL_NEXT}
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

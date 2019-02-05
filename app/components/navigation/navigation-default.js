import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import {
  defaultDisplay,
  accountNavigationVisible,
  accountNavigationHide,
} from 'redux/store/app-state/app-state.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

// components
import NavigationAccount from 'components/navigation/navigation-account'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

// styles
import {
  TriangleIcon,
  NavigationDefaultWrapper,
  AccountWrapper,
} from './styles'
import { getAccountNavigationVisibility } from 'redux/store/app-state/app-state.selectors'

const NavigationDefault = ({
  isVisibleAccountNavigation,
  accountRef,
  getAccountRef,
  onHandleClickLogo,
  onHandleClickAccount,
}) => (
  <NavigationDefaultWrapper id="navbar">
    <div title="Default display">
      <Icon
        icon={ICONS.LOGO}
        width={67}
        height={24}
        color={['#fff']}
        onClick={onHandleClickLogo}
      />
    </div>
    <div>
      <AccountWrapper
        innerRef={getAccountRef}
        title="Account"
        isVisibleAccountNavigation={isVisibleAccountNavigation}
        onClick={onHandleClickAccount}
      >
        <TriangleIcon
          icon={ICONS.TRIANGLE}
          width={11}
          height={5}
          color={['#41474b']}
        />
        <Icon
          icon={ICONS.CONTACT_EXIST}
          width={30}
          height={30}
          scale={1.42}
          color={['#8C9DA9', '#fff']}
        />
      </AccountWrapper>
      {isVisibleAccountNavigation && (
        <NavigationAccount
          accountRef={accountRef}
          onClick={onHandleClickAccount}
        />
      )}
    </div>
  </NavigationDefaultWrapper>
)

NavigationDefault.propTypes = {
  pathname: PropTypes.string,
  isVisibleAccountNavigation: PropTypes.bool,
  accountRef: PropTypes.object,
  getAccountRef: PropTypes.func,
  onHandleClickLogo: PropTypes.func,
  onHandleClickAccount: PropTypes.func,
}

const mapStateToProps = state => ({
  pathname: getRoutingPathname(state),
  isVisibleAccountNavigation: getAccountNavigationVisibility(state),
})

const mapDispatchToProps = {
  defaultDisplay,
  accountNavigationVisible,
  accountNavigationHide,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers(() => ({ accountRef: null }), {
    getAccountRef: () => ref => ({ accountRef: ref }),
    onHandleClickLogo: (state, props) => () => {
      props.defaultDisplay()
      return {}
    },
    onHandleClickAccount: (state, props) => () => {
      if (props.isVisibleAccountNavigation) {
        props.accountNavigationHide()
        return {}
      }

      props.accountNavigationVisible()
      return {}
    },
  })
)(NavigationDefault)

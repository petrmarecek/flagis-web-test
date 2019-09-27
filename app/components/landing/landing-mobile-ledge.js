import React, { PureComponent } from 'react'
import { links } from 'utils/links'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
import {
  MobileLedge,
  MobileLedgeLogo,
  MobileLedgeLogoBorder,
  MobileLedgeTitle,
  MobileLedgeStoreLink,
} from './styles'

class LandingMobileLedge extends PureComponent {
  detectMobileSystem = () => {
    if (navigator.userAgent.match(/Android/i)) {
      return {
        text: 'Get Flagis for Android',
        href: links.googlePlay,
      }
    } else if (navigator.userAgent.match(/iphone/i)) {
      return {
        text: 'Get Flagis for iOS',
        href: links.appStore,
      }
    }

    return null
  }

  render() {
    const mobileSystem = this.detectMobileSystem()

    return mobileSystem ? (
      <MobileLedge>
        <MobileLedgeLogo>
          <MobileLedgeLogoBorder>
            <Icon
              icon={ICONS.LOGO}
              color={['#293034']}
              width={33}
              height={12}
              scale={0.5}
            />
          </MobileLedgeLogoBorder>
        </MobileLedgeLogo>

        <MobileLedgeTitle>
          <p>{mobileSystem.text}</p>
        </MobileLedgeTitle>

        <MobileLedgeStoreLink>
          <a href={mobileSystem.href}>
            <p>
              <b>GET FREE</b>
            </p>
          </a>
        </MobileLedgeStoreLink>
      </MobileLedge>
    ) : null
  }
}

export default LandingMobileLedge

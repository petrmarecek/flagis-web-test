import _ from 'lodash'

import colors from '../common/colors'
import components from '../common/components'

export default _.merge({}, components, {
  // default
  primaryText: colors.darkJungleGreen,

  // left-panel
  leftPanelBackground: colors.white,

  // navigation-default
  logoIcon: colors.darkJungleGreen,
  navigationDefaultTriangle: colors.astrocopusGrey,
  navigationNotifications: colors.astrocopusGrey,
  navigationNotificationsHover: colors.darkJungleGreen,

  // navigation-primary
  navigationPrimary: colors.greyOfDarkness,
  navigationPrimaryHover: colors.darkJungleGreen,
  navigationPrimaryBorder: colors.white,
  navigationPrimaryShowMore: colors.astrocopusGrey,

  // tag-tree
  tagTreeSectionBorder: colors.greyOfDarkness,
  tagTreeSectionIconHover: colors.darkJungleGreen,
  tagTreeSectionInputFocus: colors.darkJungleGreen,
  tagTreeItemIcon: colors.darkJungleGreen,
  tagTreeItemHover: colors.darkJungleGreen,
  tagTreeItemBackgroundHover: colors.crystalBell,
  tagTreeAddFilterHover: colors.darkJungleGreen,
  tagTreeAddFilterIconBackground: colors.crystalBell,
  tagTreeAddFilterText: colors.greyOfDarkness,
  tagTreeAddNewGroupInput: colors.darkJungleGreen,
  tagTreeAddNewGroup: colors.greyOfDarkness,
  tagTreeAddNewGroupHover: colors.darkJungleGreen,
  tagTreeShadowScrollbar: colors.white,
  tagTreeScrollbar: colors.coldWind,

  // image-picker
  imagePickerButton: colors.astrocopusGrey,
  imagePickerButtonHover: colors.darkJungleGreen,

  // toast notifications
  toastNotificationBackground: colors.white,
  toastNotificationText: colors.darkJungleGreen,
})

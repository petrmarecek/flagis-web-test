const colors = {
  //gray shades
  darkJungleGreen: '#1c2124',
  aztec: '#293034',
  midnightHour: '#3e484f',
  batman: '#676d71',
  lostAtSea: '#8c9da9',
  greyOfDarkness: '#a2a2a2',
  astrocopusGrey: '#b1b5b8',
  bayOfHope: '#c1cad0',
  americanSilver: '#cecece',
  snowShadow: '#d7e3ec',
  coldWind: '#e1e4e5',
  crystalBell: '#efefef',
  whitePorcelain: '#fafafa',
  white: '#fff',

  // blue shades
  pervenche: '#0799ea',
  parachuting: '#00599c',

  // green shades
  hanumanGreen: '#44ffb1',
  shallowEnd: '#c2fee5',
  meltingGlacier: '#ecfff7',

  // red shades
  pompelmo: '#ff6a6a',
}

export default {
  // default
  contactExistIcon: [colors.lostAtSea, colors.white],
  trashHover: colors.pompelmo,

  // navigation-default
  navigationDefaultTriangleHover: colors.batman,

  // navigation-primary
  navigationPrimaryBorderHover: colors.hanumanGreen,
  navigationPrimaryShowMoreHover: colors.batman,

  // tag-tree
  tagTreeSectionBorderHover: colors.hanumanGreen,
  tagTreeSectionIcon: colors.greyOfDarkness,
  tagTreeItem: colors.greyOfDarkness,
  tagTreeAddItem: colors.greyOfDarkness,
  tagTreeAddFilterIcon: colors.greyOfDarkness,

  standard: {
    // left-panel
    leftPanelBackground: colors.darkJungleGreen,

    // navigation-default
    logoIcon: colors.white,
    navigationDefaultTriangle: colors.midnightHour,

    // navigation-primary
    navigationPrimary: colors.batman,
    navigationPrimaryHover: colors.white,
    navigationPrimaryBorder: colors.darkJungleGreen,
    navigationPrimaryShowMore: colors.midnightHour,

    // tag-tree
    tagTreeSectionBorder: colors.midnightHour,
    tagTreeSectionIconHover: colors.white,
    tagTreeItemIcon: colors.white,
    tagTreeItemHover: colors.white,
    tagTreeItemBackgroundHover: colors.midnightHour,
    tagTreeAddFilterHover: colors.white,
    tagTreeAddFilterIconBackground: colors.aztec,
    tagTreeAddFilterText: colors.midnightHour,
    addNewGroup: colors.midnightHour,
    addNewGroupHover: colors.white,
  },
  light: {
    // left-panel
    leftPanelBackground: colors.white,

    // navigation-default
    logoIcon: colors.darkJungleGreen,
    navigationDefaultTriangle: colors.astrocopusGrey,

    // navigation-primary
    navigationPrimary: colors.greyOfDarkness,
    navigationPrimaryHover: colors.darkJungleGreen,
    navigationPrimaryBorder: colors.white,
    navigationPrimaryShowMore: colors.astrocopusGrey,

    // tag-tree
    tagTreeSectionBorder: colors.greyOfDarkness,
    tagTreeSectionIconHover: colors.darkJungleGreen,
    tagTreeItemIcon: colors.darkJungleGreen,
    tagTreeItemHover: colors.darkJungleGreen,
    tagTreeItemBackgroundHover: colors.crystalBell,
    tagTreeAddFilterHover: colors.darkJungleGreen,
    tagTreeAddFilterIconBackground: colors.crystalBell,
    tagTreeAddFilterText: colors.greyOfDarkness,
    addNewGroup: colors.greyOfDarkness,
    addNewGroupHover: colors.darkJungleGreen,
  },
}

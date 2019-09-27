const breakpoints = {
  sm: 440,
  smx: 768,
  md: 1024,
  mdx: 1280,
  lg: 1366,
  lgx: 1440,
  xl: 1600,
  xlx: 1920,
}

export const mediaQueries = {
  sm: `@media (max-width: ${breakpoints.sm}px)`,
  smx: `@media (max-width: ${breakpoints.smx}px)`,
  md: `@media (max-width: ${breakpoints.md}px)`,
  mdx: `@media (max-width: ${breakpoints.mdx}px)`,
  lg: `@media (max-width: ${breakpoints.lg}px)`,
  lgx: `@media (max-width: ${breakpoints.lgx}px)`,
  xl: `@media (max-width: ${breakpoints.xl}px)`,
  xlx: `@media (max-width: ${breakpoints.xlx}px)`,
}

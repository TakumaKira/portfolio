export type ColorScheme = 'light' | 'dark';

export const projectTheme = {
  colors: {
    surfacePrimary: {
      light: '#F0F0E3',
      dark: '#38343F',
    },
    typePrimary: {
      light: '#494A43',
      dark: '#CCCDBC',
    },
    typeSecondary: {
      light: '#848171',
      dark: '#9F9D92',
    },
    borderPrimary: {
      light: '#ADABA1',
      dark: '#61615F',
    },
  },
  colorTransitionDuration: 0.2,
  // fonts are available as css variables in the global scope, using `next/font/local`
  fonts: {
    main: '--font-permanent-marker',
    sub: '--font-caveat',
  },
  rootFontSize: {
    /** px */
    default: 16,
    /** px */
    mobile: 12,
  },
  breakPoints: {
    /** px */
    minViableWidth: 390,
    /** px */
    maxWidthMobile: 450,
    /** px */
    maxWidthTablet: 900,
  },
} as const
export type ProjectTheme = typeof projectTheme;

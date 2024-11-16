export type ColorScheme = 'light' | 'dark';

export const projectTheme = {
  colors: {
    surfacePrimary: {
      light: '#F0F0E3',
      dark: '#38343F',
    },
    surfaceInverse: {
      light: '#4C4C42',
      dark: '#A8A897',
    },
    typePrimary: {
      light: '#494A43',
      dark: '#CCCDBC',
    },
    typeSecondary: {
      light: '#848171',
      dark: '#9F9D92',
    },
    typeInverse: {
      light: '#DBDAD3',
      dark: '#41413D',
    },
    borderPrimary: {
      light: '#ADABA1',
      dark: '#61615F',
    },
  },
  colorTransitionDuration: 0.2,
  shadows: {
    buttonInverse: {
      light: '1px 1px 1px 1px #48484840',
      dark: '1px 1px 1px 1px #21201D59',
    },
  },
  // fonts are available as css variables in the global scope, using `next/font/local`
  fonts: {
    main: '--font-permanent-marker',
    sub: '--font-caveat',
    normal: '--font-pt-serif-regular',
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
    minWidthTablet: 700,
    /** px */
    minWidthDesktop: 1200,
  },
} as const
export type ProjectTheme = typeof projectTheme;
